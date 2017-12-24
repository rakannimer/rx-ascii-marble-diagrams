const marbleTypes = {
  '[': {
    type: 'OPERATOR_START'
  },
  ']': {
    type: 'OPERATOR_END'
  },
  '-': {
    type: 'EMPTY_FRAME'
  },
  '|': {
    type: 'COMPLETE'
  },
  '#': {
    type: 'ERROR'
  },
  '(': {
    type: 'GROUP_START'
  },
  ')': {
    type: 'GROUP_END'
  },
  '^': {
    type: 'SUBSCRIPTION_POINT'
  }
}
const parseMarbleDiagram = marbleString => {
  const marbleDiagram = Array.from(marbleString)
  const allCharacters = marbleDiagram.map((char, i) => {
    if (char in marbleTypes) {
      return Object.assign({}, marbleTypes[char], { index: i, char })
    }
    if (char.match(/[a-zA-Z0-9]/)) {
      return { type: 'VARIABLE', char, index: i }
    }
    console.log({ var: char })
    return { type: 'UNKNOWN', char, index: i }
  })
  return allCharacters
}

const tokenizeMarbleDiagram = marbleCharacters => {
  let groupStartIndex = -1
  let groups = {}
  let operatorStartIndex = -1
  let operators = {}

  return marbleCharacters.reduce((acc, current, i) => {
    if (groupStartIndex !== -1 && current.type !== 'GROUP_END') {
      groups[groupStartIndex] = [...groups[groupStartIndex], current]
      return acc
    }
    if (operatorStartIndex !== -1 && current.type !== 'OPERATOR_END') {
      operators[operatorStartIndex] = [
        ...operators[operatorStartIndex],
        current
      ]
      return acc
    }
    switch (current.type) {
      case 'OPERATOR_START': {
        operatorStartIndex = i
        operators[operatorStartIndex] = []
        return acc
      }
      case 'OPERATOR_END': {
        if (operatorStartIndex === -1) {
          console.error(
            `Operator not defined correctly. Failing silently. Error at index ${i}`
          )
          return acc
        }
        const operatorName = operators[operatorStartIndex]
        const token = {
          type: 'OPERATOR',
          char: operatorName,
          startIndex: operatorStartIndex,
          endIndex: i,
          index: operatorStartIndex
        }
        operatorStartIndex = -1
        return [...acc, token]
      }
      case 'GROUP_START': {
        groupStartIndex = i
        groups[groupStartIndex] = []
        return acc
      }
      case 'GROUP_END': {
        if (groupStartIndex === -1) {
          console.error(
            `Sync Grouped emission not tokenized correctly. Failing silently. Error at index ${i}`
          )
          return acc
        }
        const groupContent = groups[groupStartIndex]
        const token = {
          type: 'GROUP',
          char: groupContent,
          startIndex: groupStartIndex,
          endIndex: i,
          index: groupStartIndex
        }
        groupStartIndex = -1
        return [...acc, token]
      }
      default: {
        return [...acc, current]
      }
    }
  }, [])
}

export { parseMarbleDiagram, tokenizeMarbleDiagram }
