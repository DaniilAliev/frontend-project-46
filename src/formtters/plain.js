const stringify = (value) => {
  if (typeof value === 'boolean' || value === null || typeof value === 'number') {
    return value;
  } if (typeof value !== 'object') {
    return `'${value}'`;
  }
  return '[complex value]';
};

const plain = (tree) => {
  const iter = (data, acc) => {
    const lines = data.map((node) => {
      const newAcc = acc.length > 0 ? `${acc}.${node.key}` : node.key;
      switch (node.status) {
        case 'added':
          return `Property '${newAcc}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${newAcc}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${newAcc}' was updated. From ${stringify(node.value)} to ${stringify(node.value2)}`;
        case 'recursion':
          return iter(node.children, newAcc);
        default:
          return (`Unsupported node type: ${node.status}`);
      }
    });
    return [...lines].filter((element) => element !== null).join('\n');
  };
  return iter(tree, 0);
};

export default plain;
