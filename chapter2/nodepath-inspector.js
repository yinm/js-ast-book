const {parse} = require('babylon')
const traverse = require('@babel/traverse').default

const src = 'const a = 1; hoge(a)'

const ast = parse(src)

const inspectProps = prop => {
  const propType = typeof prop

  if (propType === 'string') {
    return `'${prop}`
  } else if (propType !== 'object' || !prop) {
    return prop
  } else if (prop.constructor.name === 'Object') {
    return JSON.stringify(prop)
  } else if (prop.constructor.name === 'Array') {
    return `[${prop.map(value => inspectProps(value)).join(' ,')}]`
  } else {
    if ('type' in prop) {
      return `Object(${prop.constructor.name}) ${prop.type}`
    } else {
      return `Object(${prop.constructor.name})`
    }
  }
}

const visitor = {
  CallExpression(nodePath) {
    console.log(`enter ${nodePath.type}`)
    Object.keys(nodePath).sort().forEach(key => {
      console.log(`  ${key}:  ${inspectProps(nodePath[key])}`)
    })
  }
}

traverse(ast, visitor)