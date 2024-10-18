//pour faire l'analyse de données par rapport au résultats des intersections
const pool = require('../../database.js'); // Importez la configuration de la base de données


//avoir la prochaine valeur de seq_historique ;
async function get_sequence_historique() {
    var requete = "select nextval('seq_historique') as new_sequence_historique";

    return new Promise((resolve, reject) => {
        pool.query(requete, (error, resultat) => {
            if (error) {
                reject('Erreur de la base de données');
            }
            else {
                resolve(resultat.rows[0].new_sequence_historique);
            }
        })
    })
}

//une fonction qui insere l'historique en générale 
async function insert_historique_detail(new_sequence_historique, info) {
    var requete = "insert into historique (id , demandeur, typepermis, utilisateur,carres) values ('" + new_sequence_historique + "','" + info.demandeur + "'," + info.typepermis + ",'" + info.idUtilisateur + "'," + info.carres + ")";

    return new Promise((resolve, reject) => {
        pool.query(requete, (error, resultat) => {
            if (error) {
                reject('Erreur de la base de données');
            }
            else {
                resolve('ok');
            }
        })
    })
}

//une focntion qui insère les details des resultats de l'évaluation
async function insert_historique_result(idhistorique, result) {
    var requete = "insert into historique_result (id_historique, substance, id_result, id_result_indice) values ('" + idhistorique + "','" + result.subs + "'," + result.result + "," + result.probIndice + ")";

    return new Promise((resolve, reject) => {
        pool.query(requete, (error, resultat) => {
            if (error) {
                reject('Erreur de la base de données');
            }
            else {
                resolve('ok');
            }
        })
    })
}

//une fonction qui fait qui combine les trois fonctions
async function insert_Historique(info, result_prob) {
    try {
        const id_historique = await get_sequence_historique();
        console.log(id_historique);

        // Insertion des détails
        await insert_historique_detail(id_historique, info);

        // Boucle correcte avec for...of
        for (const resultat of result_prob) {
            await insert_historique_result(id_historique, resultat);
        }

        return 'ok';
    } catch (error) {
        console.error('Erreur lors de l’insertion dans l’historique:', error);
        throw error; // Ou return un message d'erreur si nécessaire
    }

}


module.exports = {
    insert_Historique,
    get_sequence_historique
};