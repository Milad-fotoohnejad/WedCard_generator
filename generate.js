const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const csv = require('csv-parser');

const guests = [];

// Step 1: Load and filter CSV data
fs.createReadStream('guests.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => guests.push(row))
    .on('end', async () => {
        console.log('📋 Guest list loaded. Filtering accepted RSVPs...');

        // Step 2: Filter only those who said "Yes"
        const accepted = guests.filter(row =>
            row.first_guest_rsvp?.trim().toLowerCase() === "yes" ||
            row.second_guest_rsvp?.trim().toLowerCase() === "yes"
        );

        console.log(`✅ Found ${accepted.length} guests who RSVP'd Yes. Generating cards...`);
        await generatePDFs(accepted);
    });

async function generatePDFs(acceptedGuests) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set fixed dimensions for clean single-page PDF
    const cardWidth = 800;
    const cardHeight = 1200;

    const filePath = `file:${path.join(__dirname, 'index.html')}`;
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    for (const guest of acceptedGuests) {
        // Step 3: Determine name to display
        let nameToUse = '';
        const firstYes = guest.first_guest_rsvp?.trim().toLowerCase() === "yes";
        const secondYes = guest.second_guest_rsvp?.trim().toLowerCase() === "yes";

        if (firstYes && secondYes) {
            nameToUse = guest.full_name;
        } else if (firstYes) {
            nameToUse = guest.first_guest;
        } else if (secondYes) {
            nameToUse = guest.second_guest;
        } else {
            continue;
        }

        await page.goto(filePath, { waitUntil: 'load' });
        await page.evaluate((name) => {
            const nameDiv = document.querySelector('.names');
            if (nameDiv) nameDiv.textContent = name;
        }, nameToUse);

        // ✅ Add this to fix the error
        const safeName = nameToUse.replace(/[^a-zA-Z0-9]/g, '_');

        const cardElement = await page.$('.card');
        const boundingBox = await cardElement.boundingBox();

        const outputPath = path.join(outputDir, `${safeName}.pdf`);
        await page.pdf({
            path: outputPath,
            printBackground: true,
            preferCSSPageSize: true,
            pageRanges: '1'
        });




        console.log(`📄 Saved card for: ${nameToUse}`);
    }

    await browser.close();
    console.log('🎉 All wedding cards generated successfully!');
}
