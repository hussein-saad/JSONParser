const evaluate = (node) => {
  if (node.type === 'object') {
    const obj = {};
    for (const key in node.value) {
      obj[key] = evaluate(node.value[key]);
    }
    return obj;
  }
  if (node.type === 'array') {
    return node.value.map(evaluate);
  }
  if (node.type === 'string') {
    return node.value;
  }
  if (node.type === 'number') {
    return node.value;
  }
  if (node.type === 'boolean') {
    return node.value;
  }
  if (node.type === 'null') {
    return null;
  }
};

module.exports = evaluate;