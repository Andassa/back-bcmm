const express = require('express');
const passport = require('./usepassport.js'); // Importez la configuration de la base de données
const expressSession = require('express-session');
const flash = require('express-flash');
const pool = require('./database.js'); // Importez la configuration de la base de données
// const flash = require('connect-flash');
const cors = require('cors');



const authentification = require('./controllers/authentification');
const dashboard = require('./controllers/controllerDash');
const mapPage = require('./controllers/controllerMap');
const test = require('./controllers/testController');

const app = express();
app.use(cors()); // Enable CORS for all routes

// app.set('view engine', 'ejs');



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
    if (req.isAuthenticated() && req.user.autorisation === 2) {
        return next();
    } else {
        req.flash('error', 'Accès refusé. Veuillez vous connecter en tant qu\'admin.');
        res.redirect('/login');
    }
};
const checkUserRole = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'Accès refusé. Veuillez vous connecter.');
        res.redirect('/login');
    }
};

// Utilisation du middleware d'autorisation pour les URL commençant par "/admin"
app.use('/admin', checkAdminRole);
app.use('/utilisateur', checkUserRole);
app.use('/', authentification);
app.use('/', dashboard);
app.use('/', mapPage);
app.use('/', test);

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