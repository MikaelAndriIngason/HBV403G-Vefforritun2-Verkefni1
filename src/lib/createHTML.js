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
    <script src='../public/orderTable.js'></script>
  </body>
</html>`;
}

// Býr til innihald index síðunar
function createIndexContent(content) {
  let result = '<section class="deildir" id="deildir">';

  // Býr til allar deildinar
  content.forEach(e => { 
    let link = './' + e.csv.slice(0, -3) + 'html';
    result += `<div class="deild"><h3>${e.title}</h3><p>${e.description}</p><a href="${link}">Sjá nánar ⯈</a></div>`;
  });
  
  return result + '</section>';
}

// Býr til innihald undirsíðana
function createSubPageContent(content, data) {
  let result = '';

  // Fer í gegnum allar raðirnar í csv skránni
  if(data) {
    data.slice(1).forEach(a => {
      let gildi = a.replace(/['"]+/g, '');
      gildi     = gildi.split(';');

      // Skoðar gildi hvers raðar, og birtir þær sem passa
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
  }
  return `
      <div class="lysing">
        <h2>Lýsing</h2>
        <p>${content.description}</p>
      </div>
      <section class="afangar" id="afangar">
        <h2>Áfangar</h2>
        <table id="sortedtable">
          <thead><tr><th>Númer</th><th>Heiti</th><th data-type="number">Einingar</th><th>Misseri</th><th>Námsstig</th><th> </th></tr></thead>
          <tbody>${result}</tbody>
        </table>
      </section>`;
}

/**
 * Creates a HTML template for the index page
 * @param {string} title Title of the page
 * @param {Object.<string, string>} content The content of the page
 * @returns an HTML template
 */
export function createIndex(title, content) {
  return createPage(title, createIndexContent(content), false);
}

/**
 * Creates a HTML template for a sub page
 * @param {string} title Title of the page
 * @param {Object.<string, string>} content The content of the page
 * @param {boolean} subpage Adds a button to go back to the index page
 * @returns an HTML template
 */
export function createSubPage(title, content, data, subpage) {
  return createPage(title, createSubPageContent(content, data), subpage);
}