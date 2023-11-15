const express = require('express');
const router = express.Router();
const passport = require('../usepassport.js');
const pool = require('../database.js'); // Importez la configuration de la base de données
const bcrypt = require('bcrypt');



router.post('/register', (req, res) => {
    // Récupérez les données du formulaire d'inscription
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const username = req.body.username;
    const fonction = req.body.fonction;
    const email = req.body.email;
    const password = req.body.password;

    // Hachez le mot de passe avant de le stocker en base de données
    bcrypt.hash(password, 10, (err, hash) => {
        // Stockez l'utilisateur dans la base de données PostgreSQL avec le mot de passe haché
        pool.query('INSERT INTO utilisateurs (id, nom, prenom, username, fonction , email, motdepasse , autorisation) VALUES (concat(\'user\', nextval(\'s_user\')::text), $1,$2,$3,$4,$5,$6,\'1\')', [nom, prenom, username, fonction, email, hash], (err) => {
            if (err) {
                console.error(err);
                res.send('Erreur lors de l\'inscription');
            } else {
                res.redirect('/login');
            }
        });
    });
}
);

// router.get('/login', (req, res) => {
//     // const errors = req.flash('error');
//     const errors = 'erreur';

//     if (errors.length > 0) {
//         console.log('Erreurs de connexion :', errors);
//         res.send(errors);
//     } else {
//         console.log('Connexion réussie');
//         res.send('Page de connexion');
//     }
// });


// router.post('/login',(req, res) => {
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/login',
//         failureFlash: true,
//     })
// }

module.exports = router;
