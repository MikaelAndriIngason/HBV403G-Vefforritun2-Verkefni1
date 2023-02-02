import { checkURL } from './fileTypes.js';

// Býr til template af síðu
function createPage(title, content, sub) {
    return `
    <!DOCTYPE html><html lang="is">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
            <title>${title}</title><link rel="stylesheet" href="../public/styles.css">
        </head>
        <body>
           <header><h1>${title}</h1>${sub ? '<a href="./index.html">◀ Til baka</a>' : ''}</header>
           <main>${content}</main>
           <footer><h4>Mikael Andri Ingason - Verkefni 1 - 2023<br>mai24@hi.is</h4></footer>
        </body></html>`;
}

function createIndexContent(content) {
  let result = '<section class="deildir" id="deildir">';
  content.forEach(e => { 
        let linkur = './' + e.csv.slice(0, -3) + 'html';
        result += `<div class="deild"><h3>${e.title}</h3><p>${e.description}</p><a href="${linkur}">Sjá nánar ⯈</a></div>`;
    });
    return result + '</section>';
}

function createSubPageContent(content, data) {
  let result = '';

  // Fer í gegnum allar raðirnar í csv skránni
  if(data) {
    data.slice(1).forEach(a => {
        let gildi = a.replace(/['"]+/g, '');
        gildi     = gildi.split(';');
        // Skoðar gildi hvers raðar, og birtir þá sem passa
        if (gildi.length === 6 && gildi[0] !== '' && gildi[3] !== 'Heilsárs') {

            // Ef einingarfjöldi er táknað með punkti, þá er einingarfjöldin fjarlægður
            if (gildi[2].includes('.')) gildi[2] = '...';

            // Skoðar hvort hlekkur áfangans er gild
            let link = '...';
            if (checkURL(gildi[5])) link = `<a href="${gildi[5]}">Sjá nánar ⯈</a>`;

            // Býr til röð í HTML
            result += `<tr><td>${gildi[0]}</td><td>${gildi[1]}</td><td>${gildi[2]}</td><td>${gildi[3]}</td><td>${gildi[4]}</td><td>${link}</td></tr>`;
        }
    });
    return `<div class="lysing"><h2>Lýsing</h2><p>${content.description}</p></div><section class="afangar" id="afangar"><h2>Áfangar</h2><table><thead><tr><th>Númer</th><th>Heiti</th><th>Einingar</th><th>Misseri</th><th>Námsstig</th><th> </th></tr></thead><tbody>${result}</tbody></table></section>`;
  }
  else return `<div class="lysing"><h2>Lýsing</h2><p>${content.description}</p></div><section class="afangar" id="afangar"><h2>Áfangar</h2><table><thead><tr><th>Númer</th><th>Heiti</th><th>Einingar</th><th>Misseri</th><th>Námsstig</th><th> </th></tr></thead><tbody></tbody></table></section>`;
}
  
export function createIndex(title, content, subpage) {
  return createPage(title, createIndexContent(content), subpage);
}

export function createSubPage(title, content, data, subpage) {
  return createPage(title, createSubPageContent(content, data), subpage);
}