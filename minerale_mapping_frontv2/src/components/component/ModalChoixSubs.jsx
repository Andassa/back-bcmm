import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const subs = ['Or', 'Beryl', 'Saphir', 'Emeraude', 'Labradorite', 'Tourmaline', 'talzlz', 'Beryl', 'Saphir', 'Emeraude', 'Labradorite', 'Tourmaline', 'Or', 'Beryl', 'Saphir', 'Emeraude', 'Labradorite', 'Tourmaline'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handelConfirmation = () => {
        setOpen(false);
    }

    // Créer un état pour suivre les cases cochées
    const [checkedItems, setCheckedItems] = useState({});

    // Fonction pour gérer le changement d'état des cases cochées
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setCheckedItems({
            ...checkedItems,
            [name]: checked,
        });
        console.log(name);
    };
    const handleGetCheckedItems = () => {
        const checked = Object.keys(checkedItems).filter((item) => checkedItems[item]);
        console.log('Éléments cochés :', checked);
    };
    var indice = 0;


    return (
        <React.Fragment>
            <Button size='small' onClick={handleClickOpen}>
                <AddCircleOutlineRoundedIcon color="primary" />ajouter d'autre Substances
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    séléctionner d'autres substances à ajouter
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box sx={{ flexGrow: 1 }} style={{ height: '500px', overflowY: 'scroll', }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md:16 }}>
                            {
                            subs.map((sub) => (
                                <Grid item xs={1} sm={3} md={4} key={indice}>
                                    <FormControlLabel control={<Checkbox
                                        checked={checkedItems[sub] || false} // Vérifier si la case est cochée
                                        onChange={handleCheckboxChange}
                                        name={sub} // Utiliser la valeur unique de chaque case comme nom
                                    />} label={sub} />
                                </Grid>
                                
                            ))}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handelConfirmation}>
                        confirmer
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
