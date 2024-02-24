const parser = (tokens) => {
  let cur = 0;
  const parseObject = () => {
    let value = {};
    while (tokens[cur].type !== 'rightBrace') {
      const key = tokens[cur].value;
      if (tokens[cur].type !== 'string') {
        throw new SyntaxError('Expected string');
      }
      cur++;
      if (tokens[cur].type !== 'colon') {
        throw new SyntaxError('Expected colon');
      }
      cur++;
      value[key] = parseValue();
      if (tokens[cur].type === 'comma') {
        cur++;
        if (tokens[cur].type === 'rightBrace') {
          throw new SyntaxError('trailing comma');
        }
      }
    }
    cur++; // skip right brace
    return { type: 'object', value };
  };

  const parseArray = () => {
    let value = [];
    while (tokens[cur].type !== 'rightBracket') {
      value.push(parseValue());
      if (tokens[cur].type === 'comma') {
        cur++;
      } else if (tokens[cur].type === 'rightBracket') {
        cur++;
        return { type: 'array', value };
      } else {
        throw new SyntaxError('Expected comma');
      }
    }
    // skip right bracket
    cur++;

    if (cur < tokens.length && tokens[cur].type === 'comma') {
      cur++;
    }
    return { type: 'array', value };
  };

  const parseValue = () => {
    if (!tokens.length) {
      throw new Error('NO TOKENS TO PARSE');
    }
    let token = tokens[cur];
    if (token.type === 'leftBrace') {
      cur++;
      return parseObject();
    }
    if (token.type === 'leftBracket') {
      cur++;
      return parseArray();
    }
    if (token.type === 'string') {
      cur++;
      return {
        type: 'string',
        value: token.value,
      };
    }

    if (token.type === 'number') {
      cur++;
      return {
        type: 'number',
        value: token.value,
      };
    }

    if (token.type === 'boolean') {
      cur++;
      return {
        type: 'boolean',
        value: token.value,
      };
    }

    if (token.type === 'null') {
      cur++;
      return {
        type: 'null',
        value: null,
      };
    }

    throw new SyntaxError('Unexpected token');
  };

  return parseValue();
};

module.exports = parser;
