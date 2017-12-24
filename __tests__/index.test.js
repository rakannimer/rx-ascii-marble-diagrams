import cases from 'jest-in-case'
import { parseMarbleDiagram, tokenizeMarbleDiagram } from '../src/lib/'

const diagrams = [
  { name: 'empty', diagram: '-' },
  { name: 'one', diagram: '-a-' },
  { name: 'two consecutive', diagram: '-cb-' },
  { name: 'with error', diagram: '-b-#-' },
  { name: 'hot', diagram: '-^--b--' },
  { name: 'with sync group', diagram: '-(bcd)-' },
  { name: 'with unexpected character', diagram: '->-' },
  { name: 'operator', diagram: '[switchMap]' },
  { name: 'invalid operator', diagram: 'switchMap]' },
  { name: 'operator & expression', diagram: '[filter]{i => i < 3}' },
  { name: 'invalid expression', diagram: 'i => i < 3}' }
]

describe('parseMarbleDiagram', () => {
  test('exports', () => {
    expect(parseMarbleDiagram).toBeDefined()
  })
  cases(
    'parses marble diagrams',
    opts => {
      const { diagram } = opts
      const parsedDiagram = parseMarbleDiagram(diagram)
      expect(parsedDiagram).toMatchSnapshot()
    },
    diagrams
  )
})

describe('tokenizeMarbleDiagram', () => {
  test('exports', () => {
    expect(tokenizeMarbleDiagram).toBeDefined()
  })
  cases(
    'tokenizes parsed marble diagrams',
    opts => {
      const { diagram } = opts
      const parsedDiagram = parseMarbleDiagram(diagram)
      const diagramTokens = tokenizeMarbleDiagram(parsedDiagram)
      expect(diagramTokens).toMatchSnapshot()
      // console.log({ parsedDiagram, diagramTokens })
    },
    diagrams
  )
})
