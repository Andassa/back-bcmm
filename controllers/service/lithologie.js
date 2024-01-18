//lithologie.js
//avoir les coordonnées des couches présentants des traces de la substance recherché
const pool = require('../../database.js'); // Importez la configuration de la base de données

const getCoucheSubs = (substance) => {
    return 'SELECT * FROM get_couches_subs(\'' + substance + '\')';
}

//fonction qui donne la liste des codes des couches qui intersectent les traces de substance et leurs frequences
const getGroupLithoIntersect = async(coucheSubs) => {
    return new Promise((resolve, reject) => {
        const request = 'SELECT lithology.code, lithologie, count(*) as nombre FROM lithology WHERE ST_Intersects(ST_SetSRID(geom, 4326), ST_SetSRID(\'' + coucheSubs + '\'::geometry,4326)) group by lithology.code , lithologie ;';
        pool.query(request, (error, resultat) => {
            if (error) {
                console.error(error);
                reject('Erreur de base de données');
            } else {
                const code = resultat.rows;
                resolve(code);
            }
        });
    });
}
// avoir le nombre de couche qui intersect les traces de substances
const getNombreCoucheIntersect = async (coucheSubs) => {
    return new Promise((resolve, reject) => {
        const request = 'select count(*) FROM lithology l WHERE ST_Intersects(ST_SetSRID(geom, 4326), ST_SetSRID(\'' + coucheSubs + '\'::geometry,4326)) ';
        pool.query(request, (error, resultat) => {
            if (error) {
                console.error(error);
                reject('Erreur de base de données');
            } else {
                const nombre = resultat.rows[0]["count"];
                resolve(nombre);
            }
        });
    });
};
//avoir les codes des couches qui intersectents les traces de substances, les coordonnées de ces traces et les frequences de ces codes
//les pourcentages ne sont pas encore vraiment là , juste la liste de fréquence , on aura besoin du nombre de ligne du résulat de cette requete pour pouvoir calculer ce pourcentage
const getPourcentage = async (listeCouche ,coucheSubs )=>{
    let requete = 'SELECT lithology.code, ST_Intersection(ST_SetSRID(geom, 4326), ST_SetSRID(\'' + coucheSubs + '\'::geometry,4326))AS intesection,case ';
    listeCouche.forEach(code => {
        requete = requete+ 'when code=\''+code["code"]+'\' then '+code["nombre"]+' ';
    });
    requete =requete+'else 0 end as pourcentage FROM lithology WHERE ST_Intersects(ST_SetSRID(geom, 4326), ST_SetSRID(\'' + coucheSubs + '\'::geometry,4326))';
    return new Promise((resolve, reject) => {
        pool.query(requete, (error, resultat) => {
            if (error) {
                console.error(error);
                reject('Erreur de base de données');
            } else {
                const pourcentage = resultat.rows;
                resolve(pourcentage);
            }
        });
    });
}
module.exports = {
    getCoucheSubs,
    getGroupLithoIntersect,
    getNombreCoucheIntersect,
    getPourcentage,
};
