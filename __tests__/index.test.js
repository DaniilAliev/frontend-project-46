/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [['json', 'resultstylish.txt', 'stylish'], ['yml', 'resultstylish.txt', 'stylish'], ['json', 'resultplain.txt', 'plain'], ['yml', 'resultplain.txt', 'plain']];

test.each(cases)('Compare files', (formatFile, expectedResult, format) => {
  const firstFile = getFixturePath(`file1.${formatFile}`);
  const secondFile = getFixturePath(`file2.${formatFile}`);
  const getResult = readFile(expectedResult);
  const result = genDiff(firstFile, secondFile, format);
  expect(result).toEqual(getResult);
  const data = genDiff(firstFile, secondFile, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
