import { mkdir, writeFile } from 'fs/promises';
import path, { join } from 'path';
import { direxists, readFilesFromDir } from './lib/file.js';
import { createIndex, createSubPage } from './lib/createHTML.js';
import { readCSV, readJson } from './lib/fileTypes.js';

const DATA_DIR   = './data';
const OUTPUT_DIR = './dist';

// Main fallið
async function main() {
    // Ef ./dist er ekki til, þá er það búið til
    if (!(await direxists(OUTPUT_DIR))) {
      await mkdir(OUTPUT_DIR);
    }

    const allFiles = await readFilesFromDir(DATA_DIR);
    var data = [];

    // Finnur .json skráina og býr til index síðuna
    for (const file of allFiles) {
        if (path.extname(file) === '.json') {
            data = await readJson(file);

            const filepath = join(OUTPUT_DIR, 'index.html');
            const template = createIndex('Kennsluskrá', data, false);

            await writeFile(filepath, template, { flag: 'w+' });
        }
    }

    // Býr til allar undirsíðunar frá .json + .csv skránum
    for (const department of data) {
        const csv = await readCSV(DATA_DIR + '/' + department.csv);

        const filename = department.csv.slice(0, -3) + 'html';
        const filepath = join(OUTPUT_DIR, filename);
        const template = createSubPage(department.title, department, csv, true);

        await writeFile(filepath, template, { flag: 'w+' });
    }
}

main();