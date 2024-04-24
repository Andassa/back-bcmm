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

module.exports = router;