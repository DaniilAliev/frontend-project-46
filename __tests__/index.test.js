/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = ['json', 'yml'];
const getResultStylish = readFile('resultstylish.txt');
const getResultPlain = readFile('resultplain.txt');

test.each(cases)('Compare files', (formatFile) => {
  const firstFile = getFixturePath(`file1.${formatFile}`);
  const secondFile = getFixturePath(`file2.${formatFile}`);

  const resultNoFormt = genDiff(firstFile, secondFile);
  const resultStylish = genDiff(firstFile, secondFile, 'stylish');
  const resultPlain = genDiff(firstFile, secondFile, 'plain');
  const data = genDiff(firstFile, secondFile, 'json');

  expect(resultNoFormt).toEqual(getResultStylish);
  expect(resultStylish).toEqual(getResultStylish);
  expect(resultPlain).toEqual(getResultPlain);
  expect(() => JSON.parse(data)).not.toThrow();
});
