import { createElement } from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import cases from 'jest-in-case'

import { MarbleDiagram } from '../../src/lib/renderers/react/MarbleDiagram'
Enzyme.configure({ adapter: new Adapter() })

const diagrams = [
  { name: 'empty', diagram: '-' },
  { name: 'one', diagram: '-a-', render: () => createElement('div') },
  { name: 'two consecutive', diagram: '-cb-' },
  { name: 'with error', diagram: '-b-#-' },
  { name: 'hot', diagram: '-^--b--' },
  { name: 'with sync group', diagram: '-(bcd)-' },
  { name: 'with unexpected character', diagram: '->-' },
  { name: 'with invalid group', diagram: '-bcd)-' },
  { name: 'operator', diagram: '[switchMap]' },
  { name: 'invalid operator', diagram: 'switchMap]' },
  { name: 'operator & expression', diagram: '[filter]{i => i < 3}' }
]

describe('react-marble-renderer', () => {
  test('exports', () => {
    expect(MarbleDiagram).toBeDefined()
  })
  cases(
    'mount',
    opts => {
      const element = mount(
        createElement(
          MarbleDiagram,
          { diagram: opts.diagram, render: opts.render },
          null
        )
      )
      expect(element.props()).toMatchSnapshot()
      expect(element.html()).toMatchSnapshot()
    },
    diagrams
  )
})
