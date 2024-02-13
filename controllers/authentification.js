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
    const role = req.body.role;

    // Hachez le mot de passe avant de le stocker en base de données
    bcrypt.hash(password, 10, (err, hash) => {
        // Stockez l'utilisateur dans la base de données PostgreSQL avec le mot de passe haché
        pool.query('INSERT INTO utilisateurs (id, nom, prenom, username, fonction , email, motdepasse , autorisation) VALUES (concat(\'user\', nextval(\'s_user\')::text), $1,$2,$3,$4,$5,$6,$7)', [nom, prenom, username, fonction, email, hash, role], (err) => {
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

router.get('/login', (req, res) => {
    const errors = req.flash('error');
    // Vérifiez si l'utilisateur est déjà authentifié

    if (errors.length>0) {
        console.log('Erreurs de connexion :', errors.length);
        res.send(errors[0]);
    } else {
        if (req.isAuthenticated()) {
            res.redirect('/admin/dashboard');
        } else {
            console.log(errors.length);
            res.send('Page de connexion');
        }
    }
});
router.post('/sendDatalogin', (req, res, next) => {
    passport.authenticate('local', (err, user, message, info) => {
        if (message) {
            req.flash('error', message);
            const responseData = { erreur: message };
            return res.json(responseData);
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            const responseData = { erreur: 'nom d\'utilisateur ou mot de passe incorrecte' };
            return res.json(responseData);
        }
        // Authentification réussie
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Condition pour déterminer la redirection en fonction du rôle
            if (user.autorisation === 2) {
                // const responseData = { valide: '/admin/dashboard',user:user };
                // return res.json(responseData);
                res.redirect('/admin/dashboard');
            } else if (user.autorisation === 1) {
                // const responseData = { valide: '/utilisateur/map', user:user };
                // return res.json(responseData);
                res.redirect('/utilisateur/map');
            }
            else {
                res.send('accès non autorisé');
            }
        });
    })(req, res, next);
});
router.get('/getuserAuthenticated',(req,res)=>{
    return res.json({user: req.user});
})
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            // Gérer l'erreur ici, si nécessaire
            return next(err);
        }
        // Redirection après la déconnexion
        res.redirect('/login');
    });
});


module.exports = router;
