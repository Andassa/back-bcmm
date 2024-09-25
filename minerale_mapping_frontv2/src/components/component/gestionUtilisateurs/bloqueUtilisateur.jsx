import React, { useState } from 'react';
import Paper from '@mui/material/Paper';

import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
    { id: 'nom', label: 'Nom', minWidth: 170 },
    { id: 'prenom', label: 'Prénom', minWidth: 100 },
    { id: 'fonction', label: 'Fonction', minWidth: 100 },
    { id: 'service', label: 'Service', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'autorisation', label: 'Rôle', minWidth: 100 },
];
function createData(nom, prenom, fonction) {
    return { nom, prenom, fonction };
}


export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);
    const { bloque } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rows, setRows] = useState([
        createData('Rakotomanana', 'kaka', 'direction technique'),
        createData('Raholisoa', 'David', 'direction technique'),
        createData('Rakotoarison', 'Mihary', 'Employe carthotèque'),
        createData('Rabe', 'Zo', 'Employe carthotèque'),
        createData('Randria', 'Fanilo', 'Stagiaire'),
    ]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        const filteredRows = rows.filter(row => row.nom !== 'Rabe');
        setRows(filteredRows);
        const newItem = createData('Rabe', 'Zo', 'Employe carthotèque');
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickRow = (row) => {
        console.log("Ligne cliquée:", row);
        // Ajoutez ici le code pour ce qui doit se passer lors du clic sur une ligne
    };
    const [misokatra, setMisokatra] = React.useState(false);

    const handleMisokatra = () => {
        console.log('Misokatra');
    };

    const handleMihidy = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setMisokatra(false);
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bloque
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <Button onClick={handleMisokatra}>Débloquer</Button>
                                            <Snackbar open={misokatra} autoHideDuration={600} onClose={handleMihidy}>
                                                <Alert
                                                    onClose={handleClose}
                                                    severity="success"
                                                    variant="filled"
                                                    sx={{ width: '100%' }}
                                                >
                                                    utilisateur débloqué
                                                </Alert>
                                            </Snackbar>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={bloque.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}