const express = require('express');
const pool = require('./database.js'); // Importez la configuration de la base de données
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const expressSession = require('express-session');

const app = express();
app.use(express.json());

//configuration de passport (middleware pour authentication)
passport.use(new LocalStrategy(
    (username, password, done) => {
        // Recherchez l'utilisateur dans la base de données PostgreSQL
        pool.query('SELECT * FROM utilisateurs WHERE username = $1', [username], (err, result) => {
            if (err) {
                return done(err);
            }
            if (result.rows.length === 0) {
                return done(null, false, { message: 'Nom d\'utilisateur incorrect.' });
            }
            const user = result.rows[0];
            // Vérifiez le mot de passe
            bcrypt.compare(password, user.motdepasse, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mot de passe incorrect.' });
                }
            });
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Recherchez l'utilisateur dans la base de données PostgreSQL en utilisant l'ID stocké dans la session
    pool.query('SELECT * FROM utilisateurs WHERE id = $1', [id], (err, result) => {
        if (err) return done(err);
        const user = result.rows[0];
        done(null, user);
    });
});
////////////////////////////////////////////

//ajout de session après login
app.use(expressSession({
    secret: 'bsdhrtjcegmp',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.get('/dashboard', (req, res) => {
    // Vérifiez si l'utilisateur est authentifié
    if (req.isAuthenticated()) {
        res.send('Tableau de bord protégé');
    } else {
        req.flash('error', 'Accès refusé. Veuillez vous connecter.');
        res.redirect('/login');
    }
});
// route inscription
app.post('/register', (req, res) => {
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
});

//page de login
app.get('/login', (req, response) => {
    const errors = req.flash('error');

    // Vous pouvez maintenant utiliser les messages flash récupérés dans votre logique de contrôleur.
    if (errors.length > 0) {
        // Il y a des erreurs, vous pouvez les gérer ici.
        console.log('Erreurs de connexion :', errors);
        response.send(errors);
    } else {
        // Pas d'erreurs, traitement de la connexion réussie.
        console.log('Connexion réussie');
        response.send('Page de connexion');
    }
});

//renvoye de données à passpor pour l'authentification
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true,
    })
);

//index (login normalement)
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/get-session-data', (req, res) => {
    const username = req.session.id || 'Not set';
    res.send(`Username from session: ${username}`);
});
//lister les roles 
app.get('/getroles', (req, res) => {
    pool.query('SELECT * FROM roles', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            res.json(results.rows);
        }
    });
});
//insertion de donnée subsances pour venant de la table substances
app.get('/insertdonnees', (req, res) => {
    pool.query('SELECT * FROM substances', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            let stock = [];

            results.rows.forEach(substance => {
                let substancesToAdd = [];

                if (substance.nom.includes(",")) {
                    substancesToAdd = substance.nom.split(", ");
                } else {
                    substancesToAdd = [substance.nom];
                }

                substancesToAdd.forEach(subs => {
                    if (!stock.includes(subs)) {
                        stock.push(subs);
                    }
                });
            });
            var message = "pas okay";
            stock.forEach(element1 => {
                pool.query('INSERT INTO lessubstances (nom) VALUES ($1)', [element1], (err) => {
                    if (err) {
                        console.error(err);
                        res.send('Erreur lors de l\'inscription');
                    } else {
                        message = "c'est okay";
                    }
                });
            });
            res.send(message);
        }
    });
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
