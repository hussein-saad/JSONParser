const fs = require('fs');

const tokenizer = require('./tokenizer');
const parser = require('./parser');
const evaluate = require('./evaluate');

const file = `${__dirname}/../tests/${process.argv[2]}.json`;


if (!fs.existsSync(file)) {
  console.log('File does not exist');
  process.exit(1);
}

const data = fs.readFileSync(file, 'utf8');

try {
  const tokens = tokenizer(data);
  const ast = parser(tokens);
  const result = evaluate(ast);
  console.log(result);
} catch (e) {
  console.log(e.message);
}
