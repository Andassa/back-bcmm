const pool = require('../../database.js');

async function get_nature(subs) {
    var requete = "select idprop from prop_subs where subs Ilike '" + subs + "%'";
    return new Promise((resolve, reject) => {
        pool.query(requete, (error, resultat) => {
            if (error) {
                reject('Erreur de la base de données');
            }
            else {
                resultat.rows.forEach(row => {
                    if (row.idprop === 1) {
                        resolve(1);
                    }
                    if (row.idprop === 2) {
                        resolve(2);
                    }
                    if (row.idprop === 3) {
                        resolve(3);
                    }
                });
                resolve(0);
            }
        })
    })
}

async function get_id_bd(bd) {
    var requete = "select id from propriete where libelle = '" + bd + "'";
    return new Promise((resolve, reject) => {
        pool.query(requete, (error, resultat) => {
            if (error) {
                reject('Erreur de la base de données');
            } else {
                resolve(resultat.rows);
            }
        })
    })
}
async function bd(bd, mot) {
    return new Promise((resolve, reject) => {
        get_id_bd(bd)
            .then(result => {
                var requete = "SELECT EXISTS (SELECT 1 FROM prop_subs WHERE subs ilike '" + mot + "' AND idprop = '" + result[0].id + "') AS result;";
                console.log(requete);
                pool.query(requete, (error, resultat) => {
                    if (error) {
                        reject('Erreur de base de données');
                    } else {
                        resolve(resultat.rows[0]['result']);
                    }
                })
            })
    })

}
async function roche(mot2, subs) {
    var litho = mot2.split(', ');
    for (let i = 0; i < litho.length; i++) {
        if (litho[i] === subs) {
            return 4;
        }
    }
    return 2;
}
async function roche2(litho, subs) {
    return new Promise((resolve, reject) => {
        let promises = [];
        var resultat = 0;
        litho.forEach(lith => {
            promises.push(roche(lith['mot2']).then(result => {
                if (result > resultat) {
                    resultat = result;
                }
            }))
        });
        Promise.all(promises).then(() => {
            resolve(resultat);
        }).catch(error => reject(error));
    })
}
async function mineraux(mots, indice) {
    let result = [];

    new Promise(async (resolve, reject) => {
        try {
            if (mots['mot1'] === null) {
                // const test = 'dunite';
                const mots2 = mots['mot2'].split(', ');
                // const mots2 = test.split(', ');
                for (let mot2 of mots2) {
                    if (await bd('bd5', mot2) === true || await bd('bd7', mot2) === true || await bd('bd9', mot2) === true) {
                        result.push(4);
                    } else {
                        result.push(2);
                    }
                }
            }
            else {
                const mots1 = mots['mot1'].split(', ');
                const mots2 = mots['mot2'].split(', ');
                for (let mot1 of mots1) {
                    if (await bd('bd4', mot1) === true) {
                        for (let mot2 of mots2) {
                            if (await bd('bd5', mot2) === true) {
                                result.push(4);
                            } else {
                                result.push(2);
                            }
                        }
                    } if (await bd('bd6', mot1) === true) {
                        for (let mot2 of mots2) {
                            if (await bd('bd7', mot2) === true) {
                                result.push(4);
                            } else {
                                result.push(1);
                            }
                        }
                    } if (await bd('bd8', mot1) === true) {
                        for (let mot2 of mots2) {
                            if (await bd('bd9', mot2) === true) {
                                result.push(4);
                            } else {
                                result.push(2);
                            }
                        }
                    } else {
                        result.push(0);
                    }
                }
            }
            console.log('result par lith' + indice + ' : ' + result);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}
async function mineraux2(litho) {
    new Promise((resolve, reject) => {
        let result = [];
        let promises = [];
        var indice = 0;
        try {
            litho.forEach(lith => {
                // console.log(lith['mot1']);
                indice = indice + 1;
                promises.push(
                    mineraux(lith, indice)
                        .then(resulte => {
                            indice = indice + 1;
                            // console.log('litho'+indice+': '+resulte);
                            console.log(resulte)
                            result.push(resulte);
                        })
                )
            });
            Promise.all(promises)
                .then(() => {
                    resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })
        } catch (error) {
            reject(error);
        }


    })
}
async function mot1_null(lith, base, prob) {
    return new Promise(async (resolve, reject) => {
        const mots2 = lith['mot2'].split(", ");
        var result = [];
        try {
            for (let mot2 of mots2) {
                if (await bd(base, mot2) === true) {
                    result.push(prob[0]);
                }
                else {
                    result.push(prob[1]);
                }
            }
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}
async function mot1_not_null(litho, base, prob) {
    return new Promise(async (resolve, reject) => {
        const mots1 = litho['mot1'].split(', ');
        const mots2 = litho['mot2'].split(', ');
        let result = [];
        try {
            for (let mot1 of mots1) {
                if (await bd(base[0], mot1)) {
                    for (let mot2 of mots2) {
                        if (await bd(base[1], mot2)) {
                            result.push(prob[0])
                        }
                        else result.push(prob[1])
                    }
                } else {
                    for (let mot2 of mots2) {
                        if (await bd(base[1], mot2)) {
                            result.push(prob[2])
                        }
                        else result.push(prob[3])
                    }
                }
            }
            resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}

async function elementChimique(lithologie, subs) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = [];
            if (await bd('bd10', subs) === true) {
                let resultat = [];
                for (let litho of lithologie) {
                    console.log(litho)
                    if (litho['mot1'] === null) {
                        const res = await mot1_null(litho, 'bd12', [4, 3]);
                        resultat.push(res);
                    }
                    if (litho['mot1'] !== null) {
                        const res = await mot1_not_null(litho, ['bd11', 'bd12'], [4, 3, 3, 2]);
                        resultat.push(res);
                    }
                }
                result.push(resultat);
            }
            if (await bd('bd1', subs) === true) {
                let resultat = [];
                for (let litho of lithologie) {
                    if (litho['mot1' === null]) {
                        const res = await mot1_null(litho, 'bd5', [4, 2]);
                        resultat.push(res);
                    } if (litho['mot1'] !== null) {
                        const res = await mot1_not_null(litho, ['bd4', 'bd5'], [4, 2, 3, 1]);
                        resultat.push(res);
                    }
                }
                result.push(resultat);
            }
            if (await bd('bd2', subs) === true) {
                let resultat = [];
                console.log('coucou');
                for (let litho of lithologie) {
                    if (litho['mot1' === null]) {
                        const res = await mot1_null(litho, 'bd7', [4, 1]);
                        resultat.push(res);
                    } if (litho['mot1'] !== null) {
                        const res = await mot1_not_null(litho, ['bd6', 'bd7'], [4, 1, 3, 1]);
                        resultat.push(res);
                    }
                }
                result.push(resultat);
            }
            if (await bd('bd3', subs) === true) {
                let resultat = [];
                for (let litho of lithologie) {
                    if (litho['mot1' === null]) {
                        const res = await mot1_null(litho, 'bd9', [4, 2]);
                        resultat.push(res);
                    } if (litho['mot1'] !== null) {
                        const res = await mot1_not_null(litho, ['bd8', 'bd9'], [4, 2, 3, 1]);
                        resultat.push(res);
                    }
                }
                result.push(resultat);
            } else {
                const error = 'aucune base ne correspond à la substance'
            }
            resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}


async function getResult(litho, subs) {
    return new Promise((resolve, reject) => {
        var resultat = 0;
        try {
            let promises = [];
            promises.push(
                get_nature(subs)
                    .then(resulte => {
                        if (resulte === 3) {
                            return roche2(litho, subs)
                                .then(result => {
                                    resultat = result;
                                })
                        }
                        if (resulte === 2) {
                            return mineraux2(litho)
                                .then(result => {
                                    console.log(result)
                                    resultat = result
                                })
                        }
                        if (resulte === 1) {
                            return elementChimique(litho, subs)
                                .then(result => {
                                    console.log(result);
                                    resultat = result;
                                })
                        }
                    })
            );
            Promise.all(promises)
                .then(() => {
                    resolve({ 'result': resultat, 'subs': subs });
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });

        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = {
    get_nature,
    getResult
};