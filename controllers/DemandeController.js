const express = require('express');
const router = express.Router();
const pool = require('../database.js'); // Importez la configuration de la base de données

router.get('/utilisateur/getDemandeur', (req, res) => {
    pool.query("select * from personne_societe", (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            if(results.rows?.length==0){
                const response = {erreur :'pas de suggestion'};
                return res.json(response);
            }
             return res.json(results.rows); 
        }
    });
});
router.get('/utilisateur/getTypePermis', (req, res) => {
    pool.query("select * from typepermis", (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            if(results.rows?.length==0){
                const response = {erreur :'pas de suggestion'};
                return res.json(response);
            }
             return res.json(results.rows); 
        }
    });
});
router.post('/utilisateur/getDonneDemande', (req, res) => {
    const tableauDemande = req.body.tableauDemande;
    try {
        if (tableauDemande.length>0) {
            return res.json(tableauDemande);
        } else {
            return res.json({'error':'tableau vide'});
        }
    } catch (error) {
        return res.json({"error":error});
    }
});

module.exports = router;