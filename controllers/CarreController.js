const express = require('express');
const router = express.Router();
const pool = require('../database.js'); // Importez la configuration de la base de données
const {createCarre} = require('./service/Carre');
router.post('/formeCarre', async (req, res) => {
    const tableauJSON = req.body.donnees;

    try {
        if (tableauJSON.length!=0) {
            const carres= await createCarre(tableauJSON['centre']);
            
            // requete attendu 
            // 0 liste decoupe 
            // 1 liste des centres
        
            // fonction creation des carres à partir des centres 
            // carre =[{id , coord }]
            // verification si les carres sont dans les decooupes, tsy intersection fa dans mintsy 
            // ajout de colonne inorout
            // si dans decoupe , nouvelle colonne true sinon false 
        
            // reponse attendu 
            // carre = [{id , coord , inorout }]

            
            // const detailD = await detailDecoupe(tableauJSON);

            return res.json(carres);
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