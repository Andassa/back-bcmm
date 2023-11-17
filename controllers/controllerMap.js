const express = require('express');
const router = express.Router();
// const pool = require('../database.js'); // Importez la configuration de la base de données

router.get('/map', (req, res) => {
    // Vérifiez si l'utilisateur est authentifié
    if (req.isAuthenticated()) {
        res.send('Bienvenue sur map');
    } else {
        req.flash('error', 'Accès refusé. Veuillez vous connecter.');
        res.redirect('/login');
    }
});

module.exports = router;