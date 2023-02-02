import { describe, expect, it } from '@jest/globals';
import { createIndex, createSubPage } from '../lib/createHTML.js'

describe('createIndex', () => {
    it('Returns a string template of a index page', () => {
        expect(createIndex(
            'titill', [{'title': 'test', 'description': 'desc', 'csv':'csv'}])).toBeTruthy()
    })
})

describe('createSubPage', () => {
    it('Returns a string template of a sub page', () => {
        expect(createSubPage(
            'titill', 'content', [{'title': 'test', 'description': 'desc', 'csv':'csv'}]))
            .toBeTruthy()
    })
})