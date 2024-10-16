//pour faire l'analyse de données par rapport au résultats des intersections
const pool = require('../../database.js'); // Importez la configuration de la base de données


//dropper la table emporaire 
const insertHistorique = async (info) => {
        let request = "insert into historique (demandeur, typepermis, utilisateur,carres) values ('"+info.demandeur+"',"+info.typepermis+","+info.carres+")";
        console.log(request);
    // return new Promise((resolve, reject) => {
        
    //     // pool.query(request, (error, resultat) => {
    //     //     if (error) {
    //     //         console.error(error);
    //     //         reject('Erreur de base de données');
    //     //     } else {
    //     //         resolve(resultat.rows);
    //     //     }
    //     // });
    // });
};

module.exports = {
    insertHistorique
};