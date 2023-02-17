const replacer = ' ';
const valueIndent = (depth) => (replacer.repeat(2 * depth + 2));
const bracketIndent = (depth) => (replacer.repeat(2 * depth));

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const lines = Object.keys(value)
    .map((key) => `${valueIndent(depth)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (data, depth) => {
    const lines = data.map((node) => {
      switch (node.status) {
        case 'added':
          return `${valueIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${valueIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return [`${valueIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`, `${valueIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`].join('\n');
        case 'unchanged':
          return `${valueIndent(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'recursion':
          return `${valueIndent(depth)}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          return (`Unsupported node type: ${node.status}`);
      }
    });
    return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
  };
  return iter(tree, 0);
};

export default stylish;
