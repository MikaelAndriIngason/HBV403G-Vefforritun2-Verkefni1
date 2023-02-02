import { describe, expect, it } from '@jest/globals';
import { direxists, readFilesFromDir } from '../lib/file';

describe('file', () => {
  describe('direxists', () => {
    it('returns false if dir does not exist', async () => {
      const result = await direxists('./does-not-exist');
      expect(result).toBe(false);
    });

    it('returns true if dir does exist', async () => {
      const result = await direxists('./src/test');
      expect(result).toBe(true);
    });

    it('returns false if no input', async () => {
      const result = await direxists();
      expect(result).toBe(false);
    });
  });

  describe('readFilesFromDir', () => {
    it('should return empty array for dir that does not exist', async () => {
      const result = await readFilesFromDir('./does-not-exist');

      expect(result).toEqual([]);
    });

    it('should return array of known files for dir that does exist', async () => {
      const result = await readFilesFromDir('./src/test');

      expect(result).toEqual([
        'src/test/file.test.js',
        'src/test/fileTypes.test.js',
        'src/test/createHTML.test.js'
      ]);
    });
  });
});