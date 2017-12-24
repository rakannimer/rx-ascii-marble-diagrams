import { parseMarbleDiagram, tokenizeMarbleDiagram } from '../../'

const MarbleDiagram = ({ width, height, diagram, render }) => {
  const diagramTokens = tokenizeMarbleDiagram(parseMarbleDiagram(diagram))
  const tokenCount = diagramTokens.length > 5 ? diagramTokens.length : 5
  const circleWidth = width / tokenCount / 4
  if (render !== null) {
    return render({
      diagramTokens,
      diagram,
      width,
      height,
      marbleRadius: circleWidth * 2
    })
  }
  return null
}
MarbleDiagram.defaultProps = {
  width: 1000,
  height: 500,
  diagram: '--c-b-ed-(ad)-',
  render: null
}
export { MarbleDiagram }
