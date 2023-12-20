import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ChoixSubs from './ChoixSubs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const subs = ['Or', 'Beryl', 'Saphir', 'Emeraude',];


export default function OutlinedCard() {
    return (
        <Box sx={{ minWidth: 275, padding: '10px' }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Substances séléctionnés
                        </Typography>

                    </CardContent>
                    <Box sx={{ flexGrow: 1 }}style={{height: '250px', overflowY: 'scroll',}}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {subs.map((sub) => (
                                <Grid item xs={1} sm={3} md={4} key={sub}>
                                    <Item><FormControlLabel control={<Checkbox defaultChecked />} label={sub} /></Item>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <CardActions>
                        <ChoixSubs />
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}
