import React from 'react'
import { parseMarbleDiagram, tokenizeMarbleDiagram } from '../../'
import { MarbleContainer } from './MarbleContainer'
import { Timeline } from './Timeline'

const MarbleDiagram = ({ width, height, diagram, render }) => {
  const diagramTokens = tokenizeMarbleDiagram(parseMarbleDiagram(diagram))
  const tokenCount = diagramTokens.length > 5 ? diagramTokens.length : 5
  const circleWidth = width / tokenCount / 4
  // const paddingPercentage = 2
  if (render !== null) {
    return render({
      diagramTokens,
      diagram,
      width,
      height,
      marbleRadius: circleWidth * 2
    })
  }
}
MarbleDiagram.defaultProps = {
  width: 1000,
  height: 500,
  diagram: '--c-b-ed-(ad)-',
  render: null
}
export { MarbleDiagram }
