import { describe, expect, it } from '@jest/globals';
import { readCSV, readJson, checkURL } from '../lib/fileTypes.js'

describe('checkURL', () => {
    it('Returns true if the link is valid', () => {
        expect(checkURL('https://www.google.com/')).toBe(true)
    })
    it('Returns false if the lin is not valid', () => {
        expect(checkURL('google.com')).toBe(false)
    })
})

describe('readJson', () => {
    it('Reads a json file and returns a json object, if there is a file', () => {
        expect(readJson('./src/test/test-folder/1.json')).resolves.toStrictEqual([{
            'title': 'titill', 'description': 'desc','csv': 'csv'}])
    })
    it('Returns undefined if there is no file', () => {
        expect(readJson('./src/test/test-folder/2.json')).resolves.toBe(undefined)
    })
})

describe('readCSV', () => {
    it('Reads a csv file and returns an array of strings, if there is a file', () => {
        expect(readCSV('./src/test/test-folder/2.csv')).resolves.toStrictEqual(['123','321','111'])
    })
    it('Returns undefined if there is no file', () => {
        expect(readCSV('./src/test/test-folder/3.csv')).resolves.toBe(undefined)
    })
})