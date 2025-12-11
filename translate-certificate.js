const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;

// Translation mapping from Ukrainian to English
const translations = {
    'Свідоцтво про здобуття повної загальної\nсередньої освіти': 'Certificate of Complete General\nSecondary Education',
    'Свідоцтво про здобуття повної загальної': 'Certificate of Complete General',
    'середньої освіти': 'Secondary Education',
    'Дія': 'Diia',
    'Запит на цифрові копії документів від': 'Request for digital copies of documents from',
    'Ініціатор запиту:': 'Request initiator:',
    'Ідентифікатор запиту:': 'Request identifier:',
    'Дата народження:': 'Date of birth:',
    'Заклад освіти:': 'Educational institution:',
    'Дата видачі:': 'Date of issue:',
    'Дата закінчення навчання:': 'Date of completion of studies:',
    'Директор:': 'Director:',
    'Заклад освіти, що видав документ:': 'Educational institution that issued the document:',
    'комунальний заклад "Маріупольська': 'Municipal institution "Mariupol',
    'загальноосвітня школа I-III ступенів №30': 'General Education School of I-III levels №30',
    'Маріупольської міської ради Донецької': 'of Mariupol City Council of Donetsk',
    'області"': 'Region"'
};

async function translateCertificate() {
    try {
        console.log('Creating translated certificate...');

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        // Add a page with A4 dimensions
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
        const { width, height } = page.getSize();

        // Embed fonts
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Colors
        const black = rgb(0, 0, 0);
        const darkGray = rgb(0.2, 0.2, 0.2);

        // Draw header with Ukrainian coat of arms placeholder and "Diia" label
        page.drawRectangle({
            x: 68,
            y: height - 73,
            width: 60,
            height: 60,
            borderColor: black,
            borderWidth: 2,
        });

        page.drawText('UA', {
            x: 82,
            y: height - 55,
            size: 20,
            font: helveticaBold,
            color: black,
        });

        page.drawRectangle({
            x: 140,
            y: height - 70,
            width: 50,
            height: 35,
            color: rgb(0, 0, 0),
        });

        page.drawText('Diia', {
            x: 150,
            y: height - 60,
            size: 14,
            font: helveticaBold,
            color: rgb(1, 1, 1),
        });

        // Main title
        page.drawText('Certificate of Complete General', {
            x: 230,
            y: height - 55,
            size: 18,
            font: helveticaBold,
            color: black,
        });

        page.drawText('Secondary Education', {
            x: 230,
            y: height - 75,
            size: 18,
            font: helveticaBold,
            color: black,
        });

        // Draw horizontal line
        page.drawLine({
            start: { x: 68, y: height - 105 },
            end: { x: width - 68, y: height - 105 },
            thickness: 2,
            color: black,
        });

        // Name section
        const nameY = height - 150;
        page.drawText('Kovalenko', {
            x: 68,
            y: nameY,
            size: 24,
            font: helveticaBold,
            color: black,
        });

        page.drawText('Oleksii', {
            x: 68,
            y: nameY - 30,
            size: 24,
            font: helveticaBold,
            color: black,
        });

        page.drawText('Serhiiovych', {
            x: 68,
            y: nameY - 60,
            size: 24,
            font: helveticaBold,
            color: black,
        });

        // Document number
        page.drawText('HK 52052519', {
            x: 68,
            y: nameY - 130,
            size: 32,
            font: helveticaBold,
            color: black,
        });

        // Draw horizontal line
        page.drawLine({
            start: { x: 68, y: nameY - 160 },
            end: { x: width - 68, y: nameY - 160 },
            thickness: 2,
            color: black,
        });

        // Request information
        const reqY = nameY - 190;
        page.drawText('Request for digital copies of documents from 11.12.2025, 22:24:26', {
            x: 68,
            y: reqY,
            size: 9,
            font: helvetica,
            color: darkGray,
        });

        page.drawText('Request initiator: Kovalenko Oleksii Serhiiovych', {
            x: 68,
            y: reqY - 13,
            size: 9,
            font: helvetica,
            color: darkGray,
        });

        page.drawText('Request identifier: HK52052519', {
            x: 68,
            y: reqY - 26,
            size: 9,
            font: helvetica,
            color: darkGray,
        });

        // Details section
        const detailsY = reqY - 70;
        const labelX = 68;
        const valueX = 260;

        // Date of birth
        page.drawText('Date of birth:', {
            x: labelX,
            y: detailsY,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('28.06.2002', {
            x: valueX,
            y: detailsY,
            size: 11,
            font: helvetica,
            color: black,
        });

        // Educational institution
        page.drawText('Educational institution:', {
            x: labelX,
            y: detailsY - 40,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('Municipal institution "Mariupol', {
            x: valueX,
            y: detailsY - 40,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('General Education School of I-III levels No.30', {
            x: valueX,
            y: detailsY - 53,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('of Mariupol City Council of Donetsk', {
            x: valueX,
            y: detailsY - 66,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('Region"', {
            x: valueX,
            y: detailsY - 79,
            size: 11,
            font: helvetica,
            color: black,
        });

        // Date of issue
        page.drawText('Date of issue:', {
            x: labelX,
            y: detailsY - 120,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('30.07.2020', {
            x: valueX,
            y: detailsY - 120,
            size: 11,
            font: helvetica,
            color: black,
        });

        // Date of completion
        page.drawText('Date of completion of studies:', {
            x: labelX,
            y: detailsY - 145,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('30.07.2020', {
            x: valueX,
            y: detailsY - 145,
            size: 11,
            font: helvetica,
            color: black,
        });

        // Draw horizontal line
        page.drawLine({
            start: { x: 68, y: detailsY - 170 },
            end: { x: width - 68, y: detailsY - 170 },
            thickness: 2,
            color: black,
        });

        // Director
        page.drawText('Director:', {
            x: labelX,
            y: detailsY - 200,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('A.M. Skabolkin', {
            x: valueX,
            y: detailsY - 200,
            size: 11,
            font: helvetica,
            color: black,
        });

        // Issuing institution
        page.drawText('Educational institution that issued the document:', {
            x: labelX,
            y: detailsY - 240,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('Municipal institution "Mariupol', {
            x: valueX,
            y: detailsY - 240,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('General Education School of I-III levels No.30', {
            x: valueX,
            y: detailsY - 253,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('of Mariupol City Council of Donetsk', {
            x: valueX,
            y: detailsY - 266,
            size: 11,
            font: helvetica,
            color: black,
        });

        page.drawText('Region"', {
            x: valueX,
            y: detailsY - 279,
            size: 11,
            font: helvetica,
            color: black,
        });

        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        const outputPath = '/home/user/sheettopdf/Certificate_of_Complete_General_Secondary_Education_HK52052519_11_EN.pdf';
        await fs.writeFile(outputPath, pdfBytes);

        console.log('✅ Translated certificate created successfully!');
        console.log(`📄 Output: ${outputPath}`);

        return outputPath;

    } catch (error) {
        console.error('Error translating certificate:', error);
        throw error;
    }
}

// Run the translation
if (require.main === module) {
    translateCertificate()
        .then(path => {
            console.log(`\n✨ Translation complete!`);
            console.log(`English certificate saved at: ${path}`);
        })
        .catch(error => {
            console.error('Failed to translate certificate:', error);
            process.exit(1);
        });
}

module.exports = { translateCertificate };
