import { readFile } from 'fs/promises';
import { readFileSync } from 'fs';

/**
 * Reads the contents of a CSV file
 * @param {string} path Path to file
 * @returns an array of contents (split into lines)
 */
export async function readCSV(path, { encoding = 'latin1' } = {}) {
    try {
      const content = await readFile(path);
      return content.toString(encoding).split(/\r?\n/);
    } catch (e) {
      return;
    }
}

/**
 * Reads the contents of a Json file
 * @param {string} path Path to file
 * @returns a Json object
 */
export async function readJson(path) {
    let json;
    try {
        json = JSON.parse(readFileSync(path));
    } catch (e) {
        return;
    }
    //const json = JSON.parse(readFileSync(path));
    const data = [];
    json.forEach(e => {
        data.push({title: e.title, description: e.description, csv: e.csv})
    });
    return data;
}

/**
 * Checks if a link is a valid link
 * @param {string} link the link to validate
 * @returns true if it's valid, false if not
 */
export function checkURL(link) {
    let url;
    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}