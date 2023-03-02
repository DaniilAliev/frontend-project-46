import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (data, acc) => {
    const lines = data.map((node) => {
      const newAcc = acc.length > 0 ? [acc, node.key].join('.') : [node.key];
      acc.push(node.key);
      switch (node.status) {
        case 'added':
          return `Property '${newAcc}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${newAcc}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${newAcc}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested':
          return iter(node.children, newAcc);
        default:
          throw new Error(`Unsupported node type: ${node.status}`);
      }
    });
    return [...lines].filter((element) => element !== null).join('\n');
  };
  return iter(tree, []);
};

export default plain;
