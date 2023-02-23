import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './src/parses.js';
import buildTree from './src/buildTree.js';
import format from './src/formtters/index.js';

const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
const readFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const format1 = readFormat(filepath1);
  const format2 = readFormat(filepath2);
  const parseData1 = parseFile(data1, format1);
  const parseData2 = parseFile(data2, format2);
  const innerTree = buildTree(parseData1, parseData2);
  return format(innerTree, formatName);
};

export default genDiff;
