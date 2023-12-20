import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function ImgMediaCard() {
    return (
        <Card sx={{ maxWidth: 500, alignItems: 'center' , padding:'20px'}}>
            <Typography variant="h3" gutterBottom style={{ color: 'rgb(43, 102, 147)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px' }} >
                Mineral Mapping
            </Typography>
            <Typography style={{ color: 'rgb(37, 103, 169)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="overline" display="block" gutterBottom>
                Login
            </Typography>

            <CardContent >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { width: '25ch' },
                }} style={{ alignItems: 'center' }}>
                    <TextField label={'nom d\'utilisateur'} id="margin-dense" margin="dense" />
                    <TextField label={'mot de passe'} id="margin-dense" margin="dense" type='password' />
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small">mot de passe oublié</Button>
            </CardActions>
        </Card>
    );
}
