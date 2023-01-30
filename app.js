import fs from 'fs';

const stadsetningSida = './dist/';

var undirsidur;

function buaTilSidu(nafn, titill, efni, undirsida) {
    let backButton = '';
    if (undirsida) backButton = '<a href="./index.html">◀ Til baka</a>';
    const data = new Uint8Array(
        Buffer.from(`<!DOCTYPE html><html lang="is">
                <head>
                   <meta charset="UTF-8">
                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
                   <link rel="preconnect" href="https://fonts.googleapis.com">
                   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
                   <title>${titill}</title><link rel="stylesheet" href="/styles.css">
                </head>
                <body>
                   <header><h1>${titill}</h1>${backButton}</header>
                   <main>${efni}</main>
                   <footer><h4>Mikael Andri Ingason - Verkefni 1 - 2023<br>mai24@hi.is</h4></footer>
                </body></html>`));
    fs.writeFile(stadsetningSida + nafn + '.html', data, (err) => { if (err) throw err; });
}

fs.readFile('./data/index.json', (err, data) => {
    if (err) throw err;
    undirsidur = JSON.parse(data);
    buaTilSidu('index', 'Kennsluskrá', buaTilDeildir(), false);

    undirsidur.forEach(e => {
        fs.readFile('./data/' + e.csv, { encoding : 'latin1' }, (err, data) => {
            if(err) { buaTilSidu(e.csv.slice(0, -4), e.title, `<div class="lysing"><h2>Lýsing</h2><p>${e.description}</p></div><section class="afangar" id="afangar"><h2>Áfangar</h2><table><thead><tr><th>Númer</th><th>Heiti</th><th>Einingar</th><th>Kennslumisseri</th><th>Námsstig</th><th> </th></tr></thead></table></section>`, true); return; }
            anotherTest(e, data.split(/\r?\n/));
        });
    });
});

function anotherTest(e, d) {
    let nafn = e.csv.slice(0, -4);
    let content, tafla = '';

    d.slice(1).forEach(a => {
        let gildi = a.replace(/['"]+/g, '');
        gildi = gildi.split(';');
        if (gildi.length === 6) {
            if (gildi[0] !== '') {
                if (gildi[3] !== 'Heilsárs') {
                    if (gildi[2] !== undefined && gildi[2].includes('.')) gildi[2] = '';
                    let link = '...';
                    if (checkURL(gildi[5])) link = `<a href="${gildi[5]}">Sjá nánar ⯈</a>`;
                    tafla += `<tr><td>${gildi[0]}</td><td>${gildi[1]}</td><td>${gildi[2]}</td><td>${gildi[3]}</td><td>${gildi[4]}</td><td>${link}</td></tr>`;
                }
            }
        }
    });
    content = `<div class="lysing"><h2>Lýsing</h2><p>${e.description}</p></div><section class="afangar" id="afangar"><h2>Áfangar</h2><table><thead><tr><th>Númer</th><th>Heiti</th><th>Einingar</th><th>Kennslumisseri</th><th>Námsstig</th><th> </th></tr></thead>${tafla}</table></section>`;
    buaTilSidu(nafn, e.title, content, true);
}

function checkURL(link) {
    let url;
    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}

function buaTilDeildir () {
    let content = '<section class="deildir" id="deildir">';
    undirsidur.forEach(e => { 
        let linkur = './' + e.csv.slice(0, -3) + 'html';
        content += `<div class="deild"><h3>${e.title}</h3><p>${e.description}</p><a href="${linkur}">Sjá nánar ⯈</a></div>`;
    });
    return content + '</section>';
}