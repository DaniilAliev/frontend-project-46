/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [['file1test.json', 'file2test.json', 'resulttestjson.txt'], ['file1.yml', 'file2.yml', 'resulttestjson.txt']];

test.each(cases)('Compare files', (firstName, secondName, expectedResult) => {
  const firstFile = getFixturePath(firstName);
  const secondFile = getFixturePath(secondName);
  const getResult = readFile(expectedResult);
  const result = genDiff(firstFile, secondFile);
  expect(result).toEqual(getResult);
});
