import _ from 'lodash';

const buildTree = (parseData1, parseData2) => {
  const keys1 = Object.keys(parseData1);
  const keys2 = Object.keys(parseData2);
  const keys = [...keys1, ...keys2];
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const value1 = parseData1[key];
    const value2 = parseData2[key];
    if (!_.has(parseData1, key)) {
      return { type: 'add', key, val: value2 };
    }
    if (!_.has(parseData2, key)) {
      return { type: 'remove', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: buildTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, val1: value1, val2: value2,
      };
    }
    return { type: 'same', key, val: value1 };
  });
};

export default buildTree;
