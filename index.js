const cors = require('cors');
const express = require('express');
const expressSession = require('express-session');
const passport = require('./usepassport.js'); // Importez la configuration de la base de données
const flash = require('express-flash');
const pool = require('./database.js'); // Importez la configuration de la base de données
// const flash = require('connect-flash');

const app = express();
app.use(express.json());


const authentification = require('./controllers/authentification');
const dashboard = require('./controllers/controllerDash');
const mapPage = require('./controllers/controllerMap');
const test = require('./controllers/testController');
const grid = require('./controllers/gridController');

// app.use(cors()); // Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true

}));
app.options('*', cors());





//ajout de session après login
app.use(expressSession({
    secret: 'bsdhrtjcegmp',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const checkAdminRole = (req, res, next) => {
    if (req.isAuthenticated() && req.user.autorisation === 2) {
        return next();
        // return res.json('connecté en tant que admin')
    } else {
        // req.flash('error', 'Accès refusé. Veuillez vous connecter en tant qu\'admin.');
        // res.redirect('/login');
        return res.json({erreur : 'Accès refusé. Veuillez vous connecter en tant qu\'admin.'});
    }
};
const checkUserRole = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
        // return res.json('connecté en tant utilisateur');
    } else {
        // req.flash('error', 'Accès refusé. Veuillez vous connecter.');
        // res.redirect('/login');
        return res.json({erreur :'Accès refusé. Veuillez vous connecter.'})
    }
};

// Utilisation du middleware d'autorisation pour les URL commençant par "/admin"
app.use('/admin', checkAdminRole);
app.use('/utilisateur', checkUserRole);
app.use('/', authentification);
app.use('/', dashboard);
app.use('/', mapPage);
app.use('/', test);
app.use('/', grid);

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