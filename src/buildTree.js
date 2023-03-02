import _ from 'lodash';

const buildTree = (parseData1, parseData2) => {
  const keys1 = Object.keys(parseData1);
  const keys2 = Object.keys(parseData2);
  const keys = [...keys1, ...keys2];
  const sortedKeys = _.uniq(_.sortBy(keys));

  return sortedKeys.map((key) => {
    // const value1 = parseData1[key];
    // const value2 = parseData2[key];
    if (!_.has(parseData2, key)) {
      return { key, value: parseData1[key], status: 'deleted' };
    }
    if (!_.has(parseData1, key)) {
      return { key, value: parseData2[key], status: 'added' };
    }
    if (_.isObject(parseData1[key]) && _.isObject(parseData2[key])) {
      return { key, children: buildTree(parseData1[key], parseData2[key]), status: 'nested' };
    }
    return parseData1[key] === parseData2[key] ? { key, value: parseData1[key], status: 'unchanged' } : {
      key, value1: parseData1[key], value2: parseData2[key], status: 'changed',
    };
  });
};
export default buildTree;
