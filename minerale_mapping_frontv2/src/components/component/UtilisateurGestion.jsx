import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const columns = [
    { id: 'nom', label: 'Nom', minWidth: 170 },
    { id: 'prenom', label: 'Prénom', minWidth: 100 },
    { id: 'fonction', label: 'Fonction', minWidth: 100 },
];

function createData(nom, prenom, fonction) {
    return { nom, prenom, fonction };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rows, setRows] = useState([
        createData('Rakotomanana', 'Jerry', 'direction technique'),
        createData('Raholisoa', 'David', 'direction technique'),
        createData('Rakotoarison', 'Mihary', 'Employe carthotèque'),
        createData('Rabe', 'Zo', 'Employe carthotèque'),
        createData('Randria', 'Fanilo', 'Stagiaire'),
    ]);
    const [rows2, setRows2] = useState([
        createData('Rabenja', 'Mitia', 'Stagiaire'),
    ])
    const [rows3, setRows3] = useState([
        createData('Rakoto', 'Rojotiana', 'stagiaire', 'bloqué'),
        createData('Andassa', 'Fanomezantsoa', 'stagiaire', 'bloqué'),
        createData('Rafanomezantsoa', 'Rado', 'stagiaire', 'bloqué'),
    ])

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
        setRows3([...rows3, newItem]);
        setOpen(false);
    };
    const handleClose2 = () => {
        const filteredRows = rows2.filter(row => row.nom !== 'Rabenja');
        setRows2(filteredRows);
        const newItem = createData('Rabenja', 'Mitia', 'Stagiaire')
        setRows([...rows, newItem]);
        setOpen(false);
    };
    const handleClose3 = () => {
        const filteredRows = rows3.filter(row => row.nom !== 'Rakoto');
        setRows(filteredRows);
        const newItem = createData('Rakoto', 'Rojotiana', 'stagiaire')
        setRows([...rows, newItem]);
        setOpen(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [misokatra, setMisokatra] = React.useState(false);

    const handleMisokatra = () => {
        const filteredRows = rows3.filter(row => row.nom !== 'Rakoto');
        setRows3(filteredRows);
        const newItem = createData('Rakoto', 'Rojotiana', 'stagiaire')
        setRows([...rows, newItem]);
        setOpen(false);
        setMisokatra(true);
    };

    const handleMihidy = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setMisokatra(false);
    };




    const handleClick = () => {
        setMisokatra(true);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Liste des utilisateurs" {...a11yProps(0)} />
                    <Tab label="Liste des demandes en attente de validation" {...a11yProps(1)} />
                    <Tab label="Liste des bloqués" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
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
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
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
                                                    <Button variant="outlined" color="error" onClick={handleClickOpen}>
                                                        Bloquer
                                                    </Button>
                                                    <Dialog
                                                        open={open}
                                                        onClose={() => handleClose('')}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">
                                                            {"Bloquer un utilisateur"}
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                Voulez vous vraiment bloquer Rabe Zo ?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button variant="outlined" onClose={() => handleClose('')}>annuler</Button>
                                                            <Button variant="outlined" color="error" onClick={handleClose1} autoFocus>
                                                                valider
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
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
                                {rows2
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
                                                    <Button variant="outlined" color="success" onClick={handleClickOpen}>
                                                        valider
                                                    </Button>
                                                    <Dialog
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle id="alert-dialog-title">
                                                            {"Valider la demande d'inscription"}
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                Voulez vous valider la demande d'inscription de Rabenja Mitia ?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button variant="outlined" onClick={handleClose}>annuler</Button>
                                                            <Button variant="outlined" onClick={handleClose2} autoFocus>
                                                                valider
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
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
                        count={rows2.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
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
                                {rows3
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
                        count={rows3.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </CustomTabPanel>
        </Box>
    );
}
