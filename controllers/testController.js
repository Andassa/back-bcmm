const express = require('express');
const router = express.Router();
const pool = require('../database.js'); // Importez la configuration de la base de données
const {getCoordonnées,getFrequence,getNbCoucheLitho } = require('./service/lithologie');

router.post('/getest', async (req, res) => {
    const substance = req.body.substance;
    try {
        const nbCoucheLitho = await getNbCoucheLitho(substance);
        const codefrequence = await getFrequence(substance);
        const getCoordXY = await getCoordonnées(codefrequence,substance);
        const responseData = {
            nombre :nbCoucheLitho,
            requetepourcentage: getCoordXY,
        }
        res.json(responseData);
        
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;