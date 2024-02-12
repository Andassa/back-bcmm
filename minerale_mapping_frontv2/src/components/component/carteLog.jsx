import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import axios from 'axios';

export default function ImgMediaCard() {
    let navigate = useNavigate();


    const [messageErreur, setMessageErreur] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/sendDatalogin', formData);
            if (response.data.hasOwnProperty('erreur')) {
                setMessageErreur(response.data.erreur.message);
            } else {
                if (!response.data.hasOwnProperty('user')) {
                    setMessageErreur(response.data);
                }
                navigate('/map');
                console.log(response.data)
            }
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };
    return (
        <Card sx={{ maxWidth: 500, alignItems: 'center', padding: '20px' }}>
            <Typography variant="h3" gutterBottom style={{ color: 'rgb(43, 102, 147)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px' }} >
                Mineral Mapping
            </Typography>
            <Typography style={{ color: 'rgb(37, 103, 169)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="overline" display="block" gutterBottom>
                identifiez-vous
            </Typography>

            <form onSubmit={handleSubmit} >
                <CardContent >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '25ch' },
                    }} style={{ alignItems: 'center' }}>
                        <TextField label={'nom d\'utilisateur'} id="margin-dense" margin="dense" name='username' value={FormData.username} onChange={handleChange} required />
                        <TextField label={'mot de passe'} id="margin-dense" margin="dense" type='password' name='password' value={FormData.password} onChange={handleChange} required />

                    </Box>
                </CardContent>
                <Typography style={{ color: 'rgb(37, 103, 169)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="overline" display="block" gutterBottom>
                    {messageErreur}
                </Typography>
                <Button type="submit" variant="contained" style={{ float: 'right' }}>se connecter</Button>
            </form>
                <CardActions>
                    <Button size="small" >mot de passe oublié</Button>
                </CardActions>
        </Card>
    );
}
