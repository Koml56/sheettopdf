const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;

async function replaceTextInOriginal() {
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

        // Step 1: Cover ALL Ukrainian text with white rectangles

        // Cover the entire header title area
        page.drawRectangle({
            x: 225, y: height - 90, width: 370, height: 45,
            color: white,
        });

        // Cover "Дія" button
        page.drawRectangle({
            x: 138, y: height - 73, width: 55, height: 38,
            color: white,
        });

        // Cover request info section (3 lines)
        page.drawRectangle({
            x: 65, y: height - 435, width: 530, height: 45,
            color: white,
        });

        // Cover "Дата народження:" label and entire row
        page.drawRectangle({
            x: 65, y: height - 480, width: 530, height: 20,
            color: white,
        });

        // Cover "Заклад освіти:" label and school name (4 lines)
        page.drawRectangle({
            x: 65, y: height - 565, width: 530, height: 75,
            color: white,
        });

        // Cover "Дата видачі:" label and value
        page.drawRectangle({
            x: 65, y: height - 600, width: 530, height: 20,
            color: white,
        });

        // Cover "Дата закінчення навчання:" label and value
        page.drawRectangle({
            x: 65, y: height - 625, width: 530, height: 20,
            color: white,
        });

        // Cover horizontal line and "Директор:" section
        page.drawRectangle({
            x: 65, y: height - 680, width: 530, height: 30,
            color: white,
        });

        // Cover "Заклад освіти, що видав документ:" and school name (5 lines)
        page.drawRectangle({
            x: 65, y: height - 765, width: 530, height: 75,
            color: white,
        });

        // Step 2: Add English text in the same positions

        // 1. Header title
        page.drawText('Certificate of Complete General', {
            x: 229, y: height - 58, size: 18, font: helveticaBold, color: black,
        });
        page.drawText('Secondary Education', {
            x: 229, y: height - 78, size: 18, font: helveticaBold, color: black,
        });

        // 2. "Diia" button
        page.drawRectangle({
            x: 140, y: height - 70, width: 50, height: 35,
            color: black,
        });
        page.drawText('Diia', {
            x: 150, y: height - 60, size: 14, font: helveticaBold, color: white,
        });

        // 3. Request information (smaller gray text)
        page.drawText('Request for digital copies of documents from 11.12.2025, 22:24:26', {
            x: 68, y: height - 400, size: 9, font: helvetica, color: darkGray,
        });
        page.drawText('Request initiator: Kovalenko Oleksii Serhiiovych', {
            x: 68, y: height - 413, size: 9, font: helvetica, color: darkGray,
        });
        page.drawText('Request identifier: HK52052519', {
            x: 68, y: height - 426, size: 9, font: helvetica, color: darkGray,
        });

        // 4. Date of birth
        page.drawText('Date of birth:', {
            x: 68, y: height - 470, size: 11, font: helvetica, color: black,
        });
        page.drawText('28.06.2002', {
            x: 470, y: height - 470, size: 11, font: helvetica, color: black,
        });

        // 5. Educational institution
        page.drawText('Educational institution:', {
            x: 68, y: height - 510, size: 11, font: helvetica, color: black,
        });
        page.drawText('Municipal institution "Mariupol', {
            x: 470, y: height - 510, size: 11, font: helvetica, color: black,
        });
        page.drawText('General Education School of I-III levels No.30', {
            x: 470, y: height - 523, size: 11, font: helvetica, color: black,
        });
        page.drawText('of Mariupol City Council of Donetsk', {
            x: 470, y: height - 536, size: 11, font: helvetica, color: black,
        });
        page.drawText('Region"', {
            x: 470, y: height - 549, size: 11, font: helvetica, color: black,
        });

        // 6. Date of issue
        page.drawText('Date of issue:', {
            x: 68, y: height - 590, size: 11, font: helvetica, color: black,
        });
        page.drawText('30.07.2020', {
            x: 470, y: height - 590, size: 11, font: helvetica, color: black,
        });

        // 7. Date of completion
        page.drawText('Date of completion of studies:', {
            x: 68, y: height - 615, size: 11, font: helvetica, color: black,
        });
        page.drawText('30.07.2020', {
            x: 470, y: height - 615, size: 11, font: helvetica, color: black,
        });

        // 8. Horizontal line
        page.drawLine({
            start: { x: 68, y: height - 640 },
            end: { x: width - 68, y: height - 640 },
            thickness: 2,
            color: black,
        });

        // 9. Director
        page.drawText('Director:', {
            x: 68, y: height - 670, size: 11, font: helvetica, color: black,
        });
        page.drawText('A.M. Skabolkin', {
            x: 470, y: height - 670, size: 11, font: helvetica, color: black,
        });

        // 10. Educational institution that issued the document
        page.drawText('Educational institution that issued the document:', {
            x: 68, y: height - 710, size: 11, font: helvetica, color: black,
        });
        page.drawText('Municipal institution "Mariupol', {
            x: 470, y: height - 710, size: 11, font: helvetica, color: black,
        });
        page.drawText('General Education School of I-III levels No.30', {
            x: 470, y: height - 723, size: 11, font: helvetica, color: black,
        });
        page.drawText('of Mariupol City Council of Donetsk', {
            x: 470, y: height - 736, size: 11, font: helvetica, color: black,
        });
        page.drawText('Region"', {
            x: 470, y: height - 749, size: 11, font: helvetica, color: black,
        });

        // Save the modified PDF
        const pdfBytes = await pdfDoc.save();
        const outputPath = '/home/user/sheettopdf/Certificate_of_Complete_General_Secondary_Education_HK52052519_11.pdf';
        await fs.writeFile(outputPath, pdfBytes);

        console.log('✅ Original certificate text replaced successfully!');
        console.log(`📄 Output: ${outputPath}`);

        return outputPath;

    } catch (error) {
        console.error('Error replacing text:', error);
        throw error;
    }
}

// Run the replacement
if (require.main === module) {
    replaceTextInOriginal()
        .then(path => {
            console.log(`\n✨ Text replacement complete!`);
            console.log(`Certificate saved at: ${path}`);
        })
        .catch(error => {
            console.error('Failed to replace text:', error);
            process.exit(1);
        });
}

module.exports = { replaceTextInOriginal };
