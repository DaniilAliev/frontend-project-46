/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [['file1.json', 'file2.json', 'resulttestjson.txt'], ['file1.yml', 'file2.yml', 'resulttestyml.txt'], ['file1.json', 'file2.json', 'resultplain.txt', 'plain'], ['file1.yml', 'file2.yml', 'resultplain.txt', 'plain']];

test.each(cases)('Compare files', (firstName, secondName, expectedResult, format) => {
  const firstFile = getFixturePath(firstName);
  const secondFile = getFixturePath(secondName);
  const getResult = readFile(expectedResult);
  const result = genDiff(firstFile, secondFile, format);
  expect(result).toEqual(getResult);
});
