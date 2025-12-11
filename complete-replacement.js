const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;

async function completeReplacement() {
    try {
        console.log('Loading original certificate...');

        // Load the original PDF
        const existingPdfBytes = await fs.readFile('/home/user/sheettopdf/Certificate_of_Complete_General_Secondary_Education_HK52052519_11.pdf');
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Get the first page
        const pages = pdfDoc.getPages();
        const page = pages[0];
        const { width, height } = page.getSize();

        console.log(`PDF size: ${width} x ${height}`);

        // Embed fonts
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Colors
        const white = rgb(1, 1, 1);
        const black = rgb(0, 0, 0);
        const darkGray = rgb(0.2, 0.2, 0.2);
        const lightGray = rgb(0.94, 0.94, 0.94);

        // Step 1: Cover ENTIRE page with white background
        page.drawRectangle({
            x: 0, y: 0, width: width, height: height,
            color: white,
        });

        // Step 2: Redraw everything from scratch in English

        // Ukrainian coat of arms box
        page.drawRectangle({
            x: 68, y: height - 73, width: 60, height: 60,
            borderColor: black,
            borderWidth: 2,
        });

        // "Diia" button
        page.drawRectangle({
            x: 140, y: height - 70, width: 50, height: 35,
            color: black,
        });
        page.drawText('Diia', {
            x: 150, y: height - 60, size: 14, font: helveticaBold, color: white,
        });

        // Main title
        page.drawText('Certificate of Complete General', {
            x: 229, y: height - 58, size: 18, font: helveticaBold, color: black,
        });
        page.drawText('Secondary Education', {
            x: 229, y: height - 78, size: 18, font: helveticaBold, color: black,
        });

        // First horizontal line
        page.drawLine({
            start: { x: 68, y: height - 105 },
            end: { x: width - 68, y: height - 105 },
            thickness: 2,
            color: black,
        });

        // Name
        const nameY = height - 150;
        page.drawText('Kovalenko', {
            x: 68, y: nameY, size: 24, font: helveticaBold, color: black,
        });
        page.drawText('Oleksii', {
            x: 68, y: nameY - 30, size: 24, font: helveticaBold, color: black,
        });
        page.drawText('Serhiiovych', {
            x: 68, y: nameY - 60, size: 24, font: helveticaBold, color: black,
        });

        // Document number
        page.drawText('HK 52052519', {
            x: 68, y: nameY - 130, size: 32, font: helveticaBold, color: black,
        });

        // Second horizontal line
        page.drawLine({
            start: { x: 68, y: nameY - 160 },
            end: { x: width - 68, y: nameY - 160 },
            thickness: 2,
            color: black,
        });

        // Request information (small gray text)
        const reqY = nameY - 190;
        page.drawText('Request for digital copies of documents from 11.12.2025, 22:24:26', {
            x: 68, y: reqY, size: 9, font: helvetica, color: darkGray,
        });
        page.drawText('Request initiator: Kovalenko Oleksii Serhiiovych', {
            x: 68, y: reqY - 13, size: 9, font: helvetica, color: darkGray,
        });
        page.drawText('Request identifier: HK52052519', {
            x: 68, y: reqY - 26, size: 9, font: helvetica, color: darkGray,
        });

        // Details section
        const detailsY = reqY - 70;
        const labelX = 68;
        const valueX = 260;

        // Date of birth
        page.drawText('Date of birth:', {
            x: labelX, y: detailsY, size: 11, font: helvetica, color: black,
        });
        page.drawText('28.06.2002', {
            x: valueX, y: detailsY, size: 11, font: helvetica, color: black,
        });

        // Educational institution (multi-line)
        page.drawText('Educational institution:', {
            x: labelX, y: detailsY - 40, size: 11, font: helvetica, color: black,
        });
        page.drawText('Municipal institution "Mariupol', {
            x: valueX, y: detailsY - 40, size: 11, font: helvetica, color: black,
        });
        page.drawText('General Education School of I-III', {
            x: valueX, y: detailsY - 53, size: 11, font: helvetica, color: black,
        });
        page.drawText('levels No.30 of Mariupol City', {
            x: valueX, y: detailsY - 66, size: 11, font: helvetica, color: black,
        });
        page.drawText('Council of Donetsk Region"', {
            x: valueX, y: detailsY - 79, size: 11, font: helvetica, color: black,
        });

        // Date of issue
        page.drawText('Date of issue:', {
            x: labelX, y: detailsY - 120, size: 11, font: helvetica, color: black,
        });
        page.drawText('30.07.2020', {
            x: valueX, y: detailsY - 120, size: 11, font: helvetica, color: black,
        });

        // Date of completion
        page.drawText('Date of completion of studies:', {
            x: labelX, y: detailsY - 145, size: 11, font: helvetica, color: black,
        });
        page.drawText('30.07.2020', {
            x: valueX, y: detailsY - 145, size: 11, font: helvetica, color: black,
        });

        // Third horizontal line
        page.drawLine({
            start: { x: 68, y: detailsY - 170 },
            end: { x: width - 68, y: detailsY - 170 },
            thickness: 2,
            color: black,
        });

        // Director
        page.drawText('Director:', {
            x: labelX, y: detailsY - 200, size: 11, font: helvetica, color: black,
        });
        page.drawText('A.M. Skabolkin', {
            x: valueX, y: detailsY - 200, size: 11, font: helvetica, color: black,
        });

        // Educational institution that issued the document (multi-line)
        page.drawText('Educational institution that issued the document:', {
            x: labelX, y: detailsY - 240, size: 11, font: helvetica, color: black,
        });
        page.drawText('Municipal institution "Mariupol', {
            x: valueX, y: detailsY - 240, size: 11, font: helvetica, color: black,
        });
        page.drawText('General Education School of I-III', {
            x: valueX, y: detailsY - 253, size: 11, font: helvetica, color: black,
        });
        page.drawText('levels No.30 of Mariupol City', {
            x: valueX, y: detailsY - 266, size: 11, font: helvetica, color: black,
        });
        page.drawText('Council of Donetsk Region"', {
            x: valueX, y: detailsY - 279, size: 11, font: helvetica, color: black,
        });

        // Save the completely replaced PDF
        const pdfBytes = await pdfDoc.save();
        const outputPath = '/home/user/sheettopdf/Certificate_of_Complete_General_Secondary_Education_HK52052519_11_English.pdf';
        await fs.writeFile(outputPath, pdfBytes);

        console.log('✅ Certificate completely replaced successfully!');
        console.log(`📄 Output: ${outputPath}`);

        return outputPath;

    } catch (error) {
        console.error('Error replacing certificate:', error);
        throw error;
    }
}

// Run the complete replacement
if (require.main === module) {
    completeReplacement()
        .then(path => {
            console.log(`\n✨ Complete replacement finished!`);
            console.log(`English certificate saved at: ${path}`);
        })
        .catch(error => {
            console.error('Failed to replace certificate:', error);
            process.exit(1);
        });
}

module.exports = { completeReplacement };
