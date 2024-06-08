import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../Lesmomdules/axiosInstance';


export default function ImgMediaCard() {
    let navigate = useNavigate();

    const [fonction, setFonction] = useState([]);
    const [choixFonction, setChoixFonction] = useState('');
    const [messageErreur, setMessageErreur] = useState('');
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('http://localhost:3000/register', formData);
            if (response.data.hasOwnProperty('erreur')) {
                setMessageErreur(response.data.erreur.message);
            } else {
                // console.log(response.data);
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };
    

    useEffect(() => {
        try {
            fetch('http://localhost:3000/getAllFonction', {
                method: 'Get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de l\'envoi du tableau JSON');
                    }
                    return response.json();
                })
                .then(data => setFonction(data))
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const retour = async (e) => {
        window.location.href = '/login';
    }

    const defaultProps = {
        options: fonction,
        getOptionLabel: (option) =>option.fonction.toString()
    }

    const CustomPaper = styled(Paper)({
        maxHeight: '400px',  // augmenter selon vos besoins
        minWidth: '350px',
    });

    const handleInputChange = (event, newInputValue) => {
        setChoixFonction(newInputValue)
        const formDataa= {...formData, "fonction": newInputValue}
        setFormData(formDataa);
    };
    
    return (
        <Card sx={{ maxWidth: 800, alignItems: 'center', padding: '20px' }}>
            <Typography variant="h3" gutterBottom style={{ color: 'rgb(43, 102, 147)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px' }} >
                Demande d'inscription
            </Typography>

            <form onSubmit={handleSubmit} >
                <CardContent >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '50ch' },
                    }} style={{ alignItems: 'center' }}>

                        <TextField label={'Nom'}
                            id="margin-dense" margin="dense"
                            name='nom'
                            value={FormData.nom}
                            onChange={handleChange} required />

                        <TextField
                            label={'Prénom'}
                            id="margin-dense" margin="dense"
                            name='prenom'
                            value={FormData.prenom}
                            onChange={handleChange} required />

                        <TextField
                            label={'Nom d\'utilisateur'}
                            id="margin-dense" margin="dense"
                            name='username'
                            value={FormData.username}
                            onChange={handleChange} required />

                        <TextField
                            label={'Email'}
                            id="margin-dense" margin="dense"
                            name='email'
                            value={FormData.email}
                            onChange={handleChange} required />

                        <Autocomplete
                            {...defaultProps}
                            id="disable-close-on-select" margin='dense'
                            PaperComponent={CustomPaper}
                            freeSolo
                            inputValue={choixFonction}
                            onInputChange={handleInputChange}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    name='fonction'
                                    {...params}
                                    label="fonction"
                                    
                                />
                            )}
                            sx={{ m: 0, minWidth: 170, display: 'flex' }}
                        />

                        <TextField
                            label={'Mot de passe'}
                            id="margin-dense" margin="dense" type="password"
                            name='password'
                            value={FormData.password}
                            onChange={handleChange} required />

                        <TextField
                            label={'Confirmation mot de passe'}
                            id="margin-dense" margin="dense" type='password'
                            name='password2'
                            value={FormData.password}
                            onChange={handleChange} required />


                    </Box>
                </CardContent>
                <Typography style={{ color: 'rgb(37, 103, 169)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="overline" display="block" gutterBottom>
                    {messageErreur}
                </Typography>
                <Button type="submit" variant="contained" style={{ float: 'right' }}>se connecter</Button>
            </form>
            <CardActions>
                <Button size="small" onClick={retour} >retour</Button>
            </CardActions>
        </Card>
    );
}
