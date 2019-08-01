const generate = require('@babel/generator').default

const ast = {
  type: 'Program',
  body: [{
    type: 'ExpressionStatement',
    expression: {
      type: 'BinaryExpression',
      operator: '+',
      left: {type: 'NumericLiteral', value: 1, extra: {raw: '1'}},
      right: {type: 'NumericLiteral', value: 2, extra: {raw: '2'}}
    }
  }]
}

const {code, map} = generate(ast)
console.log(code)
console.log(map)