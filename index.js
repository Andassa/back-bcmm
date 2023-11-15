const express = require('express');
const passport = require('./usepassport.js'); // Importez la configuration de la base de données
const expressSession = require('express-session');
const flash = require('express-flash');
const pool = require('./database.js'); // Importez la configuration de la base de données
// const flash = require('connect-flash');

// const authentification = require('./controllers/authentification');


const app = express();
////////////////////////////////////////////

//ajout de session après login
app.use(expressSession({
    secret: 'bsdhrtjcegmp',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
// app.use('/', authentification);

app.get('/login', (req, res) => {
    const errors = req.flash('error');
    // Vérifiez si l'utilisateur est déjà authentifié
    if (errors.length > 0) {
        console.log('Erreurs de connexion :', errors);
        res.send(errors);
    } else {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            console.log('Page de connexion');
            res.send('Page de connexion');
        }
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.get('/dashboard', (req, res) => {
    // Vérifiez si l'utilisateur est authentifié
    if (req.isAuthenticated()) {
        res.send('Tableau de bord protégé');
    } else {
        req.flash('error', 'Accès refusé. Veuillez vous connecter.');
        res.redirect('/login');
    }
});

//lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    //message de confirmation de lancement 
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

//fermer la connexion à la base de donnée
process.on('SIGINT', () => {
    pool.end(() => {
        console.log('Connexion PostgreSQL fermée');
        process.exit(0);
    });
});
module.exports = app;