import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ExportPDF = () => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Ajouter un titre
        doc.setFontSize(18);
        doc.text('Résultat d\'évaluation de demande Permis', 50, 10);

        doc.setFontSize(11);
        doc.text('Titulaire :', 10, 20);
        doc.text('BOBA', 50, 20);
        doc.text('Type de permis :', 10, 30);
        doc.text('PE Permis d\'exploitation', 50, 30);
        doc.text('Mouvement : ', 10, 40);
        doc.text('Renouvellement ', 50, 40);
        doc.text('document CSV :', 10, 50);
        doc.text('test zone 2', 50, 50);
        doc.text('nombre de Carré :', 10, 60);
        doc.text('6', 50, 60);
        doc.text('nombre de substance :', 10, 70);
        doc.text('2', 50, 70);

        // Données de la table
        const tableColumn = ["Substance", "Probabilité"];
        const tableRows = [
            ["Canada", "david@example.com"],
            ["USA", "john@example.com"],
        ];

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
      

        doc.save('example.pdf');

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
