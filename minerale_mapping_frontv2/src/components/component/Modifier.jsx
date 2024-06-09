import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';


export default function RecipeReviewCard(props) {
    const { utilisateur, setUtilisateur } = props;
    const [values, setValues] = useState({
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        username: utilisateur.username,
        fonction: utilisateur.fonction,
        email: utilisateur.email,
      });
    
      // Gestionnaire de changement pour les TextFields
      const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
      };
    
    
    const { modifier, setModifier } = props;
    const handleAnnuler = () => {
        setModifier(false)
    }
    const handleValider = ()=>{
        console.log(values)
    }
    const textF = (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { m: 2, width: '50ch' },
    }} style={{ alignItems: 'center' }}>
        <TextField
            id="standard-read-only-input"
            label="Nom"
            defaultValue={values.nom}
            variant="standard"
        />
        <TextField
            id="standard-read-only-input"
            label="Prénom"
            defaultValue={values.username}
            variant="standard"
        />
        <TextField
            id="standard-read-only-input"
            label="Nom d'utilisateur"
            defaultValue={values.username}
            variant="standard"
        />
        <TextField
            id="standard-read-only-input"
            label="Fonction"
            defaultValue={values.fonction}
            variant="standard"
        />
        <TextField
            id="standard-read-only-input"
            label="Email"
            defaultValue={values.email}
            variant="standard"
        />
        <TextField
            id="standard-read-only-input"
            label="Password"
            type="password"
            variant="standard"
        />
        <TextField
            id="standard-read-only-input"
            label=" Confirmation Password"
            type="password"
            variant="standard"
        />
    </Box>);
    const [content, setContent] = useState(<div> </div>);
    useEffect(() => {
        if (utilisateur.nom !== null) {
            setContent(textF)
        }
    }, [utilisateur])
    return (
        <Card sx={{ maxWidth: 800, alignItems: 'center', padding: '30px' }}>
            <ArrowBackIcon />
            <CardHeader
                avatar={
                    <Avatar alt={utilisateur?.nom + ' ' + utilisateur?.prenom} src='assets/images/user.png' style={{ height: '125px', width: '125px', marginLeft: '130px' }} />
                }
            />
            <CardContent>
                {content}
                <Stack spacing={30} direction="row">
                    <Button variant="outlined" onClick={handleAnnuler} >Annuler</Button>
                    <Button variant="contained" onClick={handleValider}>Valider</Button>
                </Stack>
            </CardContent>
        </Card>
    );
}