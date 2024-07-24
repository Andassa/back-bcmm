import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ExportPDF = (props) => {
    const { nomPersonne } = props;
    const { selectPermis } = props;
    const { selectedValue } = props;
    const { listeCarre } = props;
    const { nomFichier } = props;
    const { choixSubs } = props;
    const { resultat } = props;
    const [permis, setPermis] = useState('');

    const [mouvement, setMouvement] = useState('');
    useEffect(() => {
        if (selectedValue.length > 0) {
            if (selectedValue === '5') {
                setMouvement('Octroie');
            }
            if (selectedValue === '10') {
                setMouvement('Renouvellement');
            }
        }
    }, [selectedValue])
    const [res, setRes] = useState([])
    useEffect(() => {
        if (resultat.length > 0) {
            let res1 = []
            const nb = parseInt(selectedValue);

            for (let i = 0; i < nb; i++) {
                let res2 = [];
                res2.push(resultat[i].subs);
                res2.push(resultat[i].result);
                res1.push(res2);
            }
            // resultat.forEach(element => {
            //     let res2 = [];
            //     res2.push(element.subs);
            //     res2.push(element.result);
            //     res1.push(res2);
            // });
            setRes(res1)
            console.log(res)
        }
        console.log(resultat)
    }, [res, resultat, selectedValue])

    const generatePDF = () => {
        const doc = new jsPDF();

        // Ajouter un titre
        doc.setFontSize(18);
        doc.text('Résultat d\'évaluation de demande Permis', 50, 10);

        doc.setFontSize(11);
        doc.text('Titulaire :', 10, 20);
        doc.text(nomPersonne, 70, 20);
        doc.text('Type de permis :', 10, 30);
        doc.text(selectPermis.typepermis, 70, 30);
        doc.text('Mouvement : ', 10, 40);
        doc.text(mouvement, 70, 40);
        doc.text('Fichier CSV : ', 10, 50);
        doc.text(nomFichier, 70, 50);
        doc.text('Nombre de Carré :', 10, 60);
        doc.text(listeCarre.length.toString(), 70, 60);
        doc.text('Nombre de substance demandé :', 10, 70);
        doc.text(choixSubs.length.toString(), 70, 70);

        // Données de la table

        const tableColumn = ["substance", "résultat"];
        const tableRows = res;

        // Ajouter une table
        doc.autoTable({
            startY: 80,
            head: [tableColumn],
            body: tableRows,
            theme: 'plain',
            didDrawCell: (data) => {
                const { cell } = data;
                const cellText = cell.text[0]; // Texte de la cellule

                // Définir la couleur du texte en fonction de la valeur du texte
                if (cellText.includes('example.com')) {
                    doc.setTextColor(255, 0, 0); // Rouge pour les emails contenant 'example.com'
                } else if (cellText === 'USA') {
                    doc.setTextColor(0, 0, 255); // Bleu pour 'USA'
                } else if (cellText === 'Canada') {
                    doc.setTextColor(0, 255, 0); // Vert pour 'Canada'
                } else {
                    doc.setTextColor(0, 0, 0); // Noir par défaut
                }
            },
        });


        doc.save(nomPersonne + '.pdf');

    };

    return (
        <div>
            <Button variant="contained" endIcon={<PictureAsPdfIcon />} size='large' onClick={generatePDF}>
                exporter
            </Button>
        </div>
    );
};

export default ExportPDF;