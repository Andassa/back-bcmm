const express = require('express');
const router = express.Router();
const pool = require('../database.js'); // Importez la configuration de la base de données

router.post('/testGeo', (req, res) => {
    const substance = req.body.substance;
    const requete = 'SELECT * FROM get_coordonnees(\'' + substance + '\')';
    pool.query(requete, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            const requete2 = 'SELECT code , ensemble , lithologie, ere , periode , epoque ,environnem , geom FROM lithology l WHERE ST_Intersects(ST_SetSRID(geom, 4326), ST_SetSRID(\''+results.rows[0].get_coordonnees+'\'::geometry,4326))';
            pool.query(requete2, (error, resultat) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur de base de données');
                } else {
                    const responseData= {
                        nombre : resultat.rows.length,
                        couche : resultat.rows
                    }
                    res.json(responseData);
                }
            });
        }
    });
});


module.exports = router;