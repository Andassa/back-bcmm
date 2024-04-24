//pour faire l'analyse de données par rapport au résultats des intersections
const pool = require('../../database.js'); // Importez la configuration de la base de données
const Decimal = require('decimal.js');


const createCarre = async (centre) => {
    return new Promise((resolve, reject) => {
        // const cote = 0.0060222696819922945;
        const cote = new Decimal('0.005650');

        const listeCarre = [];
        let a = [];
        let c = [];
        let b = [];
        let d = [];
        let carre = [];
        
        try {
            centre.forEach(element => {
                const lat = new Decimal(element['lat']);
                const lng = new Decimal(element['lng']);
    
                a = [lat.minus(cote.dividedBy(2)), lng.plus(cote.dividedBy(2))];
                c = [lat.plus(cote.dividedBy(2)), lng.minus(cote.dividedBy(2))];
                b = [lat.plus(cote.dividedBy(2)), lng.plus(cote.dividedBy(2))];
                d = [lat.minus(cote.dividedBy(2)), lng.minus(cote.dividedBy(2))];
                carre = [a, b, c, d];
                listeCarre.push(carre);
            });
        } catch (error) {
            console.log(error);
        }
        


        resolve(listeCarre);
    });
}


module.exports = {
    createCarre
};