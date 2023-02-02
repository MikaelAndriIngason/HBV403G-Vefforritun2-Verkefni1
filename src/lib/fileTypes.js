import { readFile } from 'fs/promises';
import { readFileSync } from 'fs';

export async function readCSV(file, { encoding = 'latin1' } = {}) {
    try {
      const content = await readFile(file);
      return content.toString(encoding).split(/\r?\n/);
    } catch (e) {
      return;
    }
}

export async function readJson(path) {
    const json = JSON.parse(readFileSync(path));
    const data = [];
    json.forEach(e => {
        data.push({title: e.title, description: e.description, csv: e.csv})
    });
    return data;
}

// Skoðar hvort hlekkur er gildur
export function checkURL(link) {
    let url;
    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}