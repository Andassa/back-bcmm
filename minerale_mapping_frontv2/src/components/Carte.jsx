import React, { useState, useEffect } from 'react';
import AccordeonDetailDecoupe from './component/AccordeonDetailDecoupe';
import CarteLeaflet from './component/CarteLeaflet';
import ListeSubstance from './component/listeSubstance';
import AccordeonListeCentre from './component/AccordeonListeCentre';
import Typography from '@mui/material/Typography';
import InputInfo from './component/inputInfo';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



import './../App.css';


function MapPage() {
  const [selectDecoupe, setSelectDecoupe] = useState([]);
  const [decoupeAffiche, setDecoupeAffiche] = useState([]);
  const [listeCentre, setListeCentre] = useState([]);
  const [listeCarre, setListeCarre] = useState([]);
  const [carreSelect, setCarreSelect] = useState([]);
  const [choixSubs, setChoixSubs] = useState([]);
  const [nomPersonne, setNomPersonne] = useState('');
  const [selectPermis, setSelectPermis] = useState('');
  const [confirmation, setConfirmation] = useState({});


  /////formation de carrée venant des listes de centre////
  useEffect(() => {
    if (selectDecoupe && listeCentre) {
      const decoupe = selectDecoupe.filter(sel => sel.selectionne === 'true');
      if (decoupe.length > 0 && listeCentre.length > 0) {
        const donnees = { 'decoupes': decoupe, 'centre': listeCentre };
        fetch('http://localhost:3000/formeCarre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ donnees: donnees })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de l\'envoi du tableau JSON');
            }
            return response.json();
          })
          .then(data => {
            setListeCarre(data);
          })
          .catch(error => {
            console.error('Erreur :', error);
          });
      }
    }
  }, [selectDecoupe, listeCentre])
  ///// fin formation de carre///

  /////debut verification de valeur////
  const handelConfirmation = () => {
    if (nomPersonne.length === 0) {
      setConfirmation({ error: ' nom de demandeur vide' })
      return confirmation;
    }
    if (selectPermis.length === 0) {
      setConfirmation({ error: ' type de permis vide' })
      return confirmation;
    }
    if (listeCarre.length === 0) {
      setConfirmation({ error: ' liste de carré vide' });
      return confirmation;
    }
    if (listeCarre.length > 0) {
      for (let i = 0; i < listeCarre.length; i++) {
        if (listeCarre[i]['etat'] === 1) {
          setConfirmation({ error: ' des carrés hors decoupe' });
          return confirmation;
        }
      }
    }
    if (choixSubs.length === 0) {
      setConfirmation({ error: ' pas de substance ' })
      return confirmation;
    }
    setConfirmation({ valide: 'confirmation valide' })
    return confirmation;
  }
  /////fin verification de valeur////

  //// debut pour afficher messages d' erreurs
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  //// fin afficher messages d' erreurs

  //// debut envoie de données vers la base
  useEffect(() => {
    /////if hasOwnProperty error affichage error 
    if (confirmation.hasOwnProperty('error')) {
      async function handleClick(newState) {
        setState({ ...newState, open: true });
      };
      handleClick({ vertical: 'top', horizontal: 'center' });
    } else { /// else envoie vers la backend 
      console.log(confirmation);
    }
  }, [confirmation]);
  //// fin envoie de données vers la base 

  const boutton = (
    <React.Fragment>
      <Button variant="contained" endIcon={<SendIcon />} size='large'
        onClick={handelConfirmation}
      // onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
      >
        Envoyer
      </Button>
    </React.Fragment>
  );


  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", width: "97vw", height: "100vh" }} >
        <div style={{ width: "57vw", height: "90vh", position: "fixed" }}>
          <CarteLeaflet decoupeAffiche={decoupeAffiche} listeCarre={listeCarre} carreSelect={carreSelect} />
        </div>
        <div style={{ width: "40vw", height: '100vh', overflowY: 'scroll', marginLeft: '58vw' }}>
          <div style={{ padding: "15px" }} >
            <Typography variant="h5" gutterBottom style={{ color: 'blue' }} textAlign="center">
              Les informations de la demande de permis
            </Typography>
            <hr />
            <div style={{ padding: '30px' }}>
              <InputInfo nomPersonne={nomPersonne} setNomPersonne={setNomPersonne} selectPermis={selectPermis} setSelectPermis={setSelectPermis} />
            </div>
          </div>
          <AccordeonDetailDecoupe selectDecoupe={selectDecoupe} setSelectDecoupe={setSelectDecoupe} setDecoupeAffiche={setDecoupeAffiche} />
          <AccordeonListeCentre listeCentre={listeCentre} setListeCarre={setListeCarre} setListeCentre={setListeCentre} setCarreSelect={setCarreSelect} decoupeAffiche={decoupeAffiche} />
          <ListeSubstance setChoixSubs={setChoixSubs} />
          <div style={{ float: 'right' }} >
            {boutton}
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message={confirmation.error}
              key={vertical + horizontal}
            >
              <Alert
                // onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
              >
                ERREUR : {confirmation.error}
              </Alert>
            </ Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
