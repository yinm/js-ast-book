const {transform} = require('@babel/core')

const source = 'function hoge() {return 1}'

const tragetId = 'hoge'
const replaceCode = 'function hoge() {return 2}'

const WasCreated = Symbol('WasCreated')

const plugin = ({types: t, template}) => {
  return {
    visitor: {
      FunctionDeclaration: (nodePath, state) => {
        if (nodePath[WasCreated] || !t.isIdentifier(nodePath.node.id)) {
          return
        }
        if (nodePath.node.id.name === tragetId) {
          const newAst = template(replaceCode)()
          nodePath.replaceWith(newAst)
          nodePath[WasCreated] = true
        }
      }
    }
  }
}

console.log(transform(source, {plugins: [plugin]}).code)