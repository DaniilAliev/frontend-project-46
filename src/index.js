import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parses.js';

const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
const readFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const format1 = readFormat(filepath1);
  const format2 = readFormat(filepath2);
  const parseData1 = parseFile(data1, format1);
  const parseData2 = parseFile(data2, format2);
  const keys1 = Object.keys(parseData1);
  const keys2 = Object.keys(parseData2);
  const keys = [...keys1, ...keys2];
  const sortedKeys = _.sortBy(keys);

  const resultAr = sortedKeys.reduce((acc, key) => {
    const value1 = parseData1[key];
    const value2 = parseData2[key];
    const condition1 = Object.hasOwn(parseData1, key);
    const condition2 = Object.hasOwn(parseData2, key);
    if (condition1 && !condition2) {
      const resultString = `  - ${key}: ${value1}`;
      acc.push(resultString);
    } else if (!condition1 && condition2) {
      const resultString = `  + ${key}: ${value2}`;
      acc.push(resultString);
    } else if (condition1 && condition2 && parseData1[key] === parseData2[key]) {
      const resultString = `    ${key}: ${value1}`;
      acc.push(resultString);
    } else if (condition1 && condition2 && !_.isEqual(parseData1, parseData2)) {
      const resultString = `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
      acc.push(resultString);
    }
    return acc;
  }, []);

  const resultUnique = _.uniq(resultAr);
  const result = `{\n${resultUnique.join('\n')}\n}`;
  return result;
};

export default genDiff;
