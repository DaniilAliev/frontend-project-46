import _ from 'lodash';

const buildTree = (parseData1, parseData2) => {
  const keys1 = Object.keys(parseData1);
  const keys2 = Object.keys(parseData2);
  const keys = [...keys1, ...keys2];
  const sortedKeys = _.uniq(_.sortBy(keys));

  return sortedKeys.map((key) => {
    const value1 = parseData1[key];
    const value2 = parseData2[key];
    if (_.has(parseData1, key) && !_.has(parseData2, key)) {
      return { key, value: value1, status: 'deleted' };
    }
    if (!_.has(parseData1, key) && _.has(parseData2, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, children: buildTree(value1, value2), status: 'recursion' };
    }
    return value1 === value2 ? { key, value: value1, status: 'unchanged' } : {
      key, value: value1, value2, status: 'changed',
    };
  });
};
export default buildTree;
