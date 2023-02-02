import path, { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { readCSV, readJson } from './lib/fileTypes.js';
import { direxists, readFilesFromDir } from './lib/file.js';
import { createIndex, createSubPage } from './lib/createHTML.js';

const DATA_DIR   = './data';
const OUTPUT_DIR = './dist';

// Main fallið
async function main() {

    // Býr til './dist' ef ekki til
    if (!(await direxists(OUTPUT_DIR))) {
      await mkdir(OUTPUT_DIR);
    }

    const allFiles = await readFilesFromDir(DATA_DIR);
    var data = [];

    // Finnur .json skráina og býr til index síðuna
    for (const file of allFiles) {
        if (path.extname(file) === '.json') {
            // Les in gögn frá .json
            data = await readJson(file);

            // Býr til index síðu með gögnunum
            const filepath = join(OUTPUT_DIR, 'index.html');
            const template = createIndex('Kennsluskrá', data);

            await writeFile(filepath, template, { flag: 'w+' });
        }
    }

    // Býr til allar undirsíðunar frá .json + .csv skránum
    for (const department of data) {
        // Les in gögn frá .csv
        const csv = await readCSV(DATA_DIR + '/' + department.csv);

        // Býr til nýja undirsíðu með gögnunum
        const filename = department.csv.slice(0, -3) + 'html';
        const filepath = join(OUTPUT_DIR, filename);
        const template = createSubPage(department.title, department, csv, true);

        await writeFile(filepath, template, { flag: 'w+' });
    }
}

main();