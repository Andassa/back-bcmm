const express = require('express');
const router = express.Router();
const pool = require('../database.js'); // Importez la configuration de la base de données
const {createCarre,verifCarreDecoupe,listeCarre} = require('./service/Carre');
router.post('/formeCarre', async (req, res) => {
    const tableauJSON = req.body.donnees;

    try {
        if (tableauJSON.length!=0) {
            const booleanCarre = await listeCarre(tableauJSON['centre'],tableauJSON['decoupes']);
            // console.log(booleanCarre)
            return res.json(booleanCarre);
        }
    } catch (error) {
        return res.json({"error": error});
    }
});
router.post('/formeUnCarre', async (req,res)=>{
    const centre = req.body.centre;
    try {
        const unCarree= await createCarre(centre);
        return res.json(unCarree);
    } catch (error) {
        return res.json({ "error": error});
    }
})

module.exports = router;