const evaluateVisitor = {
  exit: nodePath => {
    if (t.isImmutable(nodePath.node)) {
      return
    }

    const {confident, value} = nodePath.evaluate()
    if (confident && typeof value !== 'object') {
      nodePath.replaceWith(valueToLiteral(value))
    }
  }
}