import fs from 'fs';

const OUTPUT_DIR = './dist/';
const DATA_DIR   = './data/';
const INDEX      = 'index';

var subPages;

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    // Les JSON skrá og býr til allar síður út frá því
    fs.readFile(DATA_DIR + INDEX + '.json', (err, data) => {
        if (err) throw err;

        subPages = JSON.parse(data);

        // Býr til forsíðuna (index)
        makePage(INDEX, 'Kennsluskrá', buaTilDeildir(), false);

        // Býr til undirsíðunar
        subPages.forEach(e => {
            fs.readFile(DATA_DIR + e.csv, { encoding : 'latin1' }, (err, data) => {
                // Ef .csv skrá er ekki til, þá er búið til auða síðu
                if(err) { makePage(e.csv.slice(0, -4), e.title, `<div class="lysing"><h2>Lýsing</h2><p>${e.description}</p></div><section class="afangar" id="afangar"><h2>Áfangar</h2>`+ makeTable('') + '</section>', true); return; }
                // Býr til undirsíðu
                makeSubPages(e, data.split(/\r?\n/));
            });
        });
    });
}

main();

// Býr til HTML síðu
async function makePage(nafn, titill, efni, undirsida) {
    const data = `
        <!DOCTYPE html><html lang="is">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
            <title>${titill}</title><link rel="stylesheet" href="./styles.css">
        </head>
        <body>
           <header><h1>${titill}</h1>${undirsida ? `<a href="./${INDEX}.html">◀ Til baka</a>` : ''}</header>
           <main>${efni}</main>
           <footer><h4>Mikael Andri Ingason - Verkefni 1 - 2023<br>mai24@hi.is</h4></footer>
        </body></html>`;

    fs.writeFile(OUTPUT_DIR + nafn + '.html', data, (err) => { 
        if (err) throw err; 
    });
}

// Býr til allar undirsíður
async function makeSubPages(e, data) {
    let nafn = e.csv.slice(0, -4);
    let content, tafla = '';

    // Fer í gegnum allar raðirnar í csv skránni
    data.slice(1).forEach(a => {
        let gildi = a.replace(/['"]+/g, '');
        gildi     = gildi.split(';');

        // Skoðar gildi hvers raðar, og birtir þá sem passa
        if (gildi.length === 6 && gildi[0] !== '' && gildi[3] !== 'Heilsárs') {

            // Ef einingarfjöldi er táknað með punkti, þá er einingarfjöldin fjarlægður
            if (gildi[2].includes('.')) gildi[2] = '';

            // Skoðar hvort hlekkur áfangans er gild
            let link = '...';
            if (checkURL(gildi[5])) link = `<a href="${gildi[5]}">Sjá nánar ⯈</a>`;

            // Býr til röð í HTML
            tafla += `<tr>
                        <td>${gildi[0]}</td>
                        <td>${gildi[1]}</td>
                        <td>${gildi[2]}</td>
                        <td>${gildi[3]}</td>
                        <td>${gildi[4]}</td
                        ><td>${link}</td>
                    </tr>`;
        }
    });
    content = `<div class="lysing"><h2>Lýsing</h2><p>${e.description}</p></div><section class="afangar" id="afangar"><h2>Áfangar</h2>` + makeTable(tafla);
    makePage(nafn, e.title, content, true);
}

// Skoðar hvort hlekkur er gildur
function checkURL(link) {
    let url;
    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}

function buaTilDeildir() {
    let content = '<section class="deildir" id="deildir">';
    subPages.forEach(e => { 
        let linkur = './' + e.csv.slice(0, -3) + 'html';
        content += `<div class="deild"><h3>${e.title}</h3><p>${e.description}</p><a href="${linkur}">Sjá nánar ⯈</a></div>`;
    });
    return content + '</section>';
}

function makeTable(content) {
    return `<table>
                <thead>
                    <tr>
                        <th>Númer</th>
                        <th>Heiti</th>
                        <th>Einingar</th>
                        <th>Misseri</th>
                        <th>Námsstig</th>
                        <th> </th>
                    </tr>
                </thead>
                ${content}
            </table>
        </section>`;
}


function makeTable(content) {
    return `<table><thead><tr><th>Númer</th><th>Heiti</th><th>Einingar</th><th>Misseri</th><th>Námsstig</th><th> </th></tr></thead>${content} </table></section>`;
}