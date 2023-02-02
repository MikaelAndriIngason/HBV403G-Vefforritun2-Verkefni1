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
        expect(readJson('./src/test/testfiles/readjsontest.json')).resolves.toBe('123')
    })
})