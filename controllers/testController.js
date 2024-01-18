const express = require('express');
const router = express.Router();
const pool = require('../database.js'); // Importez la configuration de la base de données
const { getCoucheSubs, getGroupLithoIntersect, getNombreCoucheIntersect, getPourcentage } = require('./service/lithologie');

router.post('/getPourcentage', async (req, res) => {
    const substance = req.body.substance;
    try {
        pool.query(getCoucheSubs(substance), async (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur de base de données');
            } else {
                const codeCoucheIntersect = await getGroupLithoIntersect(results.rows[0].get_couches_subs);
                const requetepourcentage = await getPourcentage(codeCoucheIntersect,results.rows[0].get_couches_subs);
                const responseData = {
                    nombre: requetepourcentage.length,
                    requetepourcentage: requetepourcentage,
                }
                res.json(responseData);
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;