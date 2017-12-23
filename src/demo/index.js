import React, { createElement } from 'react'
import ReactDOM from 'react-dom'
import { MarbleDiagram } from '../lib/renderers/react/MarbleDiagram'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      diagram: '--1--2--3--4'
    }
  }
  render () {
    const diagrams = this.state.diagram.split('\n')
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          {diagrams.map((diagram, i) => (
            <MarbleDiagram
              key={diagram + i}
              width={1000}
              height={200}
              diagram={diagram}
            />
          ))}
        </div>
        <div style={{ width: 1000 }}>
          <textarea
            type="text"
            style={{
              width: 1000,
              height: 200,
              fontSize: '20px',
              textAlign: 'center',
              border: '3px solid #cccccc',
              padding: 50
            }}
            onChange={event => {
              const text = event.target.value
              this.setState({ diagram: text })
            }}
            value={this.state.diagram}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(createElement(Main), document.getElementById('demo-app'))
