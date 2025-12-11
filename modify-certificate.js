const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;

async function modifyCertificate() {
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

        // Cover Ukrainian text with white rectangles and add English text

        // 1. Main title - "Свідоцтво про здобуття повної загальної середньої освіти"
        page.drawRectangle({
            x: 228, y: height - 85, width: 400, height: 35,
            color: white,
        });
        page.drawText('Certificate of Complete General', {
            x: 229, y: height - 58, size: 18, font: helveticaBold, color: black,
        });
        page.drawText('Secondary Education', {
            x: 229, y: height - 78, size: 18, font: helveticaBold, color: black,
        });

        // 2. "Дія" label - keep as is or translate
        page.drawRectangle({
            x: 140, y: height - 70, width: 50, height: 35,
            color: white,
        });
        page.drawRectangle({
            x: 140, y: height - 70, width: 50, height: 35,
            color: black,
        });
        page.drawText('Diia', {
            x: 150, y: height - 60, size: 14, font: helveticaBold, color: white,
        });

        // 3. Request info line
        page.drawRectangle({
            x: 68, y: height - 410, width: 520, height: 40,
            color: white,
        });
        page.drawText('Request for digital copies of documents from 11.12.2025, 22:24:26', {
            x: 68, y: height - 400, size: 9, font: helvetica, color: darkGray,
        });
        page.drawText('Request initiator: Kovalenko Oleksii Serhiiovych', {
            x: 68, y: height - 413, size: 9, font: helvetica, color: darkGray,
        });
        page.drawText('Request identifier: HK52052519', {
            x: 68, y: height - 426, size: 9, font: helvetica, color: darkGray,
        });

        // 4. Labels section
        const labelsToTranslate = [
            { ua: 'Дата народження:', en: 'Date of birth:', x: 68, y: height - 470 },
            { ua: 'Заклад освіти:', en: 'Educational institution:', x: 68, y: height - 510 },
            { ua: 'Дата видачі:', en: 'Date of issue:', x: 68, y: height - 590 },
            { ua: 'Дата закінчення навчання:', en: 'Date of completion of studies:', x: 68, y: height - 615 },
            { ua: 'Директор:', en: 'Director:', x: 68, y: height - 670 },
            { ua: 'Заклад освіти, що видав документ:', en: 'Educational institution that issued the document:', x: 68, y: height - 710 },
        ];

        labelsToTranslate.forEach(label => {
            // Cover Ukrainian label
            page.drawRectangle({
                x: label.x - 2, y: label.y - 2, width: 240, height: 15,
                color: white,
            });
            // Write English label
            page.drawText(label.en, {
                x: label.x, y: label.y, size: 11, font: helvetica, color: black,
            });
        });

        // 5. School name translation
        // Cover Ukrainian school name
        page.drawRectangle({
            x: 260, y: height - 545, width: 280, height: 65,
            color: white,
        });
        page.drawText('Municipal institution "Mariupol', {
            x: 260, y: height - 510, size: 11, font: helvetica, color: black,
        });
        page.drawText('General Education School of I-III levels No.30', {
            x: 260, y: height - 523, size: 11, font: helvetica, color: black,
        });
        page.drawText('of Mariupol City Council of Donetsk', {
            x: 260, y: height - 536, size: 11, font: helvetica, color: black,
        });
        page.drawText('Region"', {
            x: 260, y: height - 549, size: 11, font: helvetica, color: black,
        });

        // 6. School name in "issued document" section
        page.drawRectangle({
            x: 260, y: height - 749, width: 280, height: 65,
            color: white,
        });
        page.drawText('Municipal institution "Mariupol', {
            x: 260, y: height - 710, size: 11, font: helvetica, color: black,
        });
        page.drawText('General Education School of I-III levels No.30', {
            x: 260, y: height - 723, size: 11, font: helvetica, color: black,
        });
        page.drawText('of Mariupol City Council of Donetsk', {
            x: 260, y: height - 736, size: 11, font: helvetica, color: black,
        });
        page.drawText('Region"', {
            x: 260, y: height - 749, size: 11, font: helvetica, color: black,
        });

        // Save the modified PDF
        const pdfBytes = await pdfDoc.save();
        const outputPath = '/home/user/sheettopdf/Certificate_of_Complete_General_Secondary_Education_HK52052519_11_EN_Modified.pdf';
        await fs.writeFile(outputPath, pdfBytes);

        console.log('✅ Certificate modified successfully!');
        console.log(`📄 Output: ${outputPath}`);

        return outputPath;

    } catch (error) {
        console.error('Error modifying certificate:', error);
        throw error;
    }
}

// Run the modification
if (require.main === module) {
    modifyCertificate()
        .then(path => {
            console.log(`\n✨ Modification complete!`);
            console.log(`Modified certificate saved at: ${path}`);
        })
        .catch(error => {
            console.error('Failed to modify certificate:', error);
            process.exit(1);
        });
}

module.exports = { modifyCertificate };
