const express = require('express');
const passport = require('./usepassport.js'); // Importez la configuration de la base de données
const expressSession = require('express-session');
const flash = require('express-flash');
const pool = require('./database.js'); // Importez la configuration de la base de données
// const flash = require('connect-flash');

const authentification = require('./controllers/authentification');
const dashboard = require('./controllers/controllerDash');
const mapPage = require('./controllers/controllerMap');

const app = express();


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
const checkAdminRole = (req, res, next) => {
    // Vérifie si l'utilisateur est authentifié et a le rôle d'administrateur
    if (req.isAuthenticated() && req.user.autorisation === 2) {
        // Si l'utilisateur a le rôle d'administrateur, passez à la prochaine étape
        return next();
    } else {
        // Sinon, renvoyez une erreur ou redirigez l'utilisateur
        res.status(403).send('Accès refusé'); // Par exemple, renvoie un statut 403 (interdit)
        // ou
        // res.redirect('/unauthorized'); // Redirigez l'utilisateur vers une page d'autorisation refusée
    }
};

// Utilisation du middleware d'autorisation pour les URL commençant par "/admin"
app.use('/admin', checkAdminRole);
app.use('/', authentification);
app.use('/', dashboard);
app.use('/', mapPage);

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