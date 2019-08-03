const {transform} = require('@babel/core')

const plugin = babel => {
  return {
    visitor: {
      Program: (nodePath, state) => {
        console.log(state.opts)
      }
    }
  }
}

const plugins = [
  [plugin, {hoge: 'foobar'}]
]

transform('1 + 2', {plugins})