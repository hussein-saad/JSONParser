const tokenizer = (json) => {
  const tokens = [];
  let cur = 0;

  while (cur < json.length) {
    let char = json[cur];
    if (char === '{') {
      tokens.push({ type: 'leftBrace', value: '{' });
      cur++;
      continue;
    }
    if (char === '}') {
      tokens.push({ type: 'rightBrace', value: '}' });
      cur++;
      continue;
    }
    if (char === ':') {
      tokens.push({ type: 'colon', value: ':' });
      cur++;
      continue;
    }

    if (char === ',') {
      tokens.push({ type: 'comma', value: ',' });
      cur++;
      continue;
    }

    if (char === '[') {
      tokens.push({ type: 'leftBracket', value: '[' });
      cur++;
      continue;
    }

    if (char === ']') {
      tokens.push({ type: 'rightBracket', value: ']' });
      cur++;
      continue;
    }

    if (char === '"') {
      let value = '';
      char = json[++cur];
      while (char !== '"') {
        value += char;
        char = json[++cur];
      }
      tokens.push({ type: 'string', value });
      cur++;
      continue;
    }

    if (char === ' ' || char === '\n' || char === '\t') {
      cur++;
      continue;
    }

    if (char === 't') {
      let value = '';
      while (value.length < 4) {
        value += json[cur];
        cur++;
      }
      if (value === 'true') {
        tokens.push({ type: 'boolean', value: true });
      }
      continue;
    }

    if (char === 'f') {
      let value = '';
      while (value.length < 5) {
        value += json[cur];
        cur++;
      }
      if (value === 'false') {
        tokens.push({ type: 'boolean', value: false });
      }
      continue;
    }

    if (char === 'n') {
      let value = '';
      while (value.length < 4) {
        value += json[cur];
        cur++;
      }
      if (value === 'null') {
        tokens.push({ type: 'null', value: null });
      }
      continue;
    }

    if (char === '-' || (char >= '0' && char <= '9')) {
      let value = '';
      while ((char >= '0' && char <= '9') || char === '.') {
        value += char;
        char = json[++cur];
      }
      tokens.push({ type: 'number', value: parseFloat(value) });
      continue;
    }

    throw new Error(`Invalid character: ${char} at position ${cur}`);
  }
  return tokens;
};

module.exports = tokenizer;
