import React, { useState, useEffect } from 'react';
// import AccordeonSearchPermis from './component/AccordeonSearchPermis';
// import AccordeonCoord from './component/AccordeonCoord';
// import AccordeonDetailPermis from './component/AccordeonDetailPermis';
import RechercheDecoupe from './component/RechercheDecoupe';
import AccordeonDetailDecoupe from './component/AccordeonDetailDecoupe';
import CarteLeaflet from './component/CarteLeaflet';
import ListeSubstance from './component/listeSubstance';
import AccordeonListeCentre from './component/AccordeonListeCentre';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputInfo from './component/inputInfo';

import './../App.css';

function MapPage() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [coordonnees, setCoordonnees] = useState(null);
  const [selectPermis, setSelectPermis] = useState(null);
  const [selectDecoupe, setSelectDecoupe] = useState([]);
  const [decoupeAffiche, setDecoupeAffiche] = useState([]);
  const [listeCentre, setListeCentre] = useState([]);
  const [listeCarre, setListeCarre] = useState([]);
  const [carreSelect, setCarreSelect] = useState([]);

  useEffect(() => {
    if (selectDecoupe && listeCentre) {
      const decoupe = selectDecoupe.filter(sel => sel.selectionne === 'true');
      if (decoupe.length > 0 && listeCentre.length > 0) {
        const donnees = { 'decoupes': decoupe, 'centre': listeCentre };
        console.log(donnees);
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
            console.log(data);
            setListeCarre(data);
          })
          .catch(error => {
            console.error('Erreur :', error);
          });
      }
    }
  }, [selectDecoupe, listeCentre])

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
              <InputInfo />
            </div>
            <div style={{ paddingLeft: '50px', paddingRight: '50px' }} sx={{ m: 0, minWidth: 150, display: 'flex' }}>
              <RechercheDecoupe setSelectDecoupe={setSelectDecoupe} selectDecoupe={selectDecoupe} />
            </div>
          </div>
          <AccordeonDetailDecoupe selectDecoupe={selectDecoupe} setSelectDecoupe={setSelectDecoupe} setDecoupeAffiche={setDecoupeAffiche} />
          <AccordeonListeCentre listeCentre={listeCentre} setListeCentre={setListeCentre} setCarreSelect={setCarreSelect} decoupeAffiche={decoupeAffiche} />
          <ListeSubstance />
        </div>
      </div>
    </div>
  );
}

export default MapPage;
