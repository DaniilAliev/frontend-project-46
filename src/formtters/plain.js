const isComplexValue = (value) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  return '[complex value]';
};

const plain = (tree) => {
  const iter = (data, acc) => {
    const lines = data.map((node) => {
      const newAcc = acc.length > 0 ? `${acc}.${node.key}` : node.key;
      switch (node.status) {
        case 'added':
          return `Property '${newAcc}' was added with value: ${isComplexValue(node.value)}`;
        case 'deleted':
          return `Property '${newAcc}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${newAcc}' was updated. From '${node.value}' to '${node.value2}'`;
        case 'recursion':
          return iter(node.children, newAcc);
        default:
          return (`Unsupported node type: ${node.status}`);
      }
    });
    return [...lines].join('\n');
  };
  return iter(tree, 0);
};

export default plain;
