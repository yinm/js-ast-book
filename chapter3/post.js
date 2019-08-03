const {transform} = require('@babel/core')

const plugin = babel => {
  return {
    pre() {
      this.hoge = 'hoge'
    },
    visitor: {
      Program: (nodePath, state) => {
        console.log(state.hoge)
        state.hoge = 'ほげ'
      }
    },
    post() {
      console.log(this.hoge)
    }
  }
}

transform('1 + 2', {plugins: [plugin]})