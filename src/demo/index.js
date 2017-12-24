import React, { createElement } from 'react'
import ReactDOM from 'react-dom'
import randomcolor from 'randomcolor'
import { MarbleDiagram } from '../lib/renderers/react/MarbleDiagram'

const randomColor = opts => randomcolor(Object.assign({}, opts))
const styles = {
  timeline: {
    line: ({ width, arrowWidth }) => ({
      position: 'absolute',
      width: width - arrowWidth * 0.5,
      backgroundColor: randomColor({
        hue: 'monochrome',
        luminosity: 'light',
        seed: 43
      }),
      height: 2,
      zIndex: 0
    }),
    arrow: ({ arrowWidth, arrowColor, width }) => ({
      position: 'absolute',
      width: 0,
      height: 0,
      borderTop: `${arrowWidth / 4}px solid transparent`,
      borderBottom: `${arrowWidth / 4}px solid transparent`,
      borderRight: `${arrowWidth / 4}px solid transparent`,
      borderLeft: `${arrowWidth / 4}px solid ${randomColor({
        hue: 'monochrome',
        luminosity: 'light',
        seed: 43
      })}`,
      marginTop: -arrowWidth / 4,
      marginLeft: width - arrowWidth * 0.5,
      zIndex: 0
    })
  },
  marbleDiagramsContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  textEditorContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  marbleDiagramRenderer: ({ width, height }) => ({
    width: width,
    height: height,
    marginTop: 50,
    overflow: 'auto'
  }),
  frame: props => ({
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  }),
  emptyFrame: props =>
    Object.assign({}, styles.frame(props), {
      borderRadius: '50%',
      backgroundColor: randomColor({
        seed: 'emptyFrame',
        luminosity: 'light'
        // hue: 'monochrome'
      }),
      color: randomColor({
        seed: 'emptyFrame',
        luminosity: 'dark'
        // hue: 'monochrome'
      }),
      opacity: 0.2
    }),
  emissionFrame: props =>
    Object.assign({}, styles.frame(props), {
      borderRadius: '50%',
      backgroundColor: randomColor({
        seed: 'emissionFrame',
        luminosity: 'dark'
      }),
      color: randomColor({ seed: 'emissionFrame', luminosity: 'light' })
    }),
  expressionFrame: props =>
    Object.assign({}, styles.frame(props), {
      width: props.marbleRadius * 2,
      borderRadius: 5,
      backgroundColor: randomColor({
        seed: 'emissionFrame',
        luminosity: 'dark'
      }),
      color: randomColor({ seed: 'emissionFrame', luminosity: 'light' })
    }),
  operatorFrame: props =>
    Object.assign({}, styles.frame(props), {
      width: props.marbleRadius * 2,
      borderRadius: 5,
      paddingLeft: 100,
      paddingRight: 100,
      backgroundColor: randomColor({
        seed: 'operatorFrame_1',
        luminosity: 'bright'
      }),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: randomColor({
        seed: 'operatorFrame_bright',
        luminosity: 'bright'
      }),
      zIndex: 2
    })
}

const Timeline = ({ circleWidth, width, arrowColor, marginTop }) => {
  const arrowWidth = 60
  return (
    <div
      style={{
        zIndex: 0,
        marginTop: marginTop, // circleWidth * 2 - arrowWidth / 4,
        position: 'absolute'
      }}
    >
      <div key="line" style={styles.timeline.line({ width, arrowWidth })} />
      <div
        key="arrow"
        style={styles.timeline.arrow({ width, arrowColor, arrowWidth })}
      />
    </div>
  )
}
Timeline.defaultProps = {
  circleWidth: 50,
  width: 500,
  arrowColor: 'green',
  marginTop: 20
}

const MarbleListContainer = ({ width, marbleRadius, children }) => (
  <div
    style={{
      display: 'flex',
      width: width,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingRight: marbleRadius,
      zIndex: 2,
      marginTop: 0
    }}
  >
    {children}
  </div>
)

const MarbleDiagramsContainer = ({ children }) => {
  return (
    <div
      className="MarbleDiagramsContainer"
      style={styles.marbleDiagramsContainer()}
    >
      {children}
    </div>
  )
}

const MarbleDiagramRenderer = props => {
  const { width, height, marbleRadius, diagramTokens } = props
  const [firstToken] = diagramTokens
  if (!firstToken) return null
  const { type } = firstToken
  const isOperator = type === 'OPERATOR'
  // console.log({ firstToken })
  return (
    <div
      className="MarbleDiagramRenderer"
      style={styles.marbleDiagramRenderer({ width, height })}
    >
      {!isOperator && (
        <Timeline
          width={width}
          circleWidth={marbleRadius}
          arrowColor={props.arrowColor}
        />
      )}

      <MarbleListContainer
        marbleRadius={props.marbleRadius}
        width={props.width}
      >
        {props.diagramTokens.map(({ type, char }) => {
          switch (type) {
            case 'EMPTY_FRAME':
              return <div style={styles.emptyFrame(props)}>{char}</div> // <Circle r={width}>-</Circle>
            // break
            case 'GROUP':
              const syncEmissions = char
                .map(({ char: value }) => value)
                .join('')
              return (
                <div style={styles.emissionFrame(props)}>{syncEmissions}</div>
              )
            case 'EXPRESSION':
              const expression = char.map(({ char: value }) => value).join('')
              return (
                <div style={styles.expressionFrame(props)}>{expression}</div>
              )
            case 'OPERATOR':
              const operatorName = char.map(({ char: value }) => value).join('')
              return (
                <div style={styles.operatorFrame(props)}>
                  <a
                    href={`http://rxmarbles.com/#${operatorName}`}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    {operatorName}
                  </a>
                </div>
              )
            default:
              return <div style={styles.emissionFrame(props)}>{char}</div>
          }
        })}
      </MarbleListContainer>
    </div>
  )
}
MarbleDiagramRenderer.defaultProps = {
  width: 50,
  height: 50,
  diagramTokens: [],
  diagram: '',
  marbleRadius: 50
}

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      diagram: `--1--2--3--4-(ab)
[filter]{i => i < 3}
--1--2--------`
    }
  }
  render () {
    const diagrams = this.state.diagram.split('\n')
    return (
      <div className="container">
        <section className="section">
          <MarbleDiagramsContainer>
            {diagrams.map((diagram, i) => (
              <MarbleDiagram
                key={diagram + i}
                width={1000}
                height={60}
                diagram={diagram}
                render={props => (
                  <MarbleDiagramRenderer arrowColor={'black'} {...props} />
                )}
              />
            ))}
          </MarbleDiagramsContainer>
        </section>
        <section className="section" style={styles.textEditorContainer()}>
          <div className="control">
            <textarea
              className="textarea is-large"
              type="text"
              style={{
                width: 1000,
                height: 200
                // fontSize: '20px',
                // textAlign: 'center',
                // border: '3px solid #cccccc',
                // padding: 50
              }}
              onChange={event => {
                const text = event.target.value
                this.setState({ diagram: text })
              }}
              value={this.state.diagram}
            />
          </div>
        </section>
      </div>
    )
  }
}

ReactDOM.render(createElement(Main), document.getElementById('demo-app'))
