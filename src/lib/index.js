// const mm = require('micromatch')
const marbleTypes = {
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
  return marbleCharacters.reduce((acc, current, i) => {
    if (groupStartIndex !== -1 && current.type !== 'GROUP_END') {
      groups[groupStartIndex] = [...groups[groupStartIndex], current]
      return acc
    }
    switch (current.type) {
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
