const express = require('express');
const router = express.Router();
const { createMultiPolygon } = require('./service/Carre');
const { getLitho } = require('./service/lithology');
const { get_nature, getResult,getResultfinal } = require('./service/roche');
const { getSubs_byId,get_All_Subs_by_id } = require('./service/substance');
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
router.post('/getDonneDemande', async(req, res) => {
    const tableauDemande = req.body.donneesTableau;
    try {
        if (tableauDemande!= null) {
            // const listeSubstances = tableauDemande['choixSubs'];
            const listeCarre = tableauDemande['listeCarre'];
            const req = await createMultiPolygon(listeCarre);
            const lith = await getLitho(req);
            const subs = await get_All_Subs_by_id(tableauDemande['choixSubs']);
            // const result = await getResult(lith, subs[0][0]['nom']);
            const result = await getResultfinal(lith, subs);
            console.log(lith);
            console.log(result);
            return res.json(result);
        } else {
            return res.json({'error':'tableau vide'});
        }
    } catch (error) {
        return res.json({"error":error});
    }
});

module.exports = router;