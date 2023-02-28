/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [['json', 'stylish.txt', 'plain.txt'], ['yml', 'stylish.txt', 'plain.txt']];

test.each(cases)('Compare files', (formatFile, expectedResultStylish, expectedResultPlain) => {
  const firstFile = getFixturePath(`file1.${formatFile}`);
  const secondFile = getFixturePath(`file2.${formatFile}`);
  const getResultStylish = readFile(`result${expectedResultStylish}`);
  const getResultPlain = readFile(`result${expectedResultPlain}`);
  const resultStylish = genDiff(firstFile, secondFile, 'stylish');
  const resultPlain = genDiff(firstFile, secondFile, 'plain');
  const data = genDiff(firstFile, secondFile, 'json');
  expect(resultStylish).toEqual(getResultStylish);
  expect(resultPlain).toEqual(getResultPlain);
  expect(() => JSON.parse(data)).not.toThrow();
});
