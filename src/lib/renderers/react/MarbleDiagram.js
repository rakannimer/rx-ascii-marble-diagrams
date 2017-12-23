import React from 'react'
import { parseMarbleDiagram, tokenizeMarbleDiagram } from '../../'
import { MarbleContainer } from './MarbleContainer'
import { Timeline } from './Timeline'

const MarbleDiagram = ({ width, height, diagram }) => {
  const diagramTokens = tokenizeMarbleDiagram(parseMarbleDiagram(diagram))
  const tokenCount = diagramTokens.length > 5 ? diagramTokens.length : 5
  const circleWidth = width / tokenCount / 4
  const paddingPercentage = 2
  return (
    <div>
      <svg width={width} height={height}>
        <Timeline width={width} circleWidth={circleWidth} />
        {diagramTokens.map((token, i) => (
          <MarbleContainer
            key={JSON.stringify(token)}
            token={token}
            width={circleWidth}
            i={i}
            paddingPercentage={paddingPercentage}
          />
        ))}
      </svg>
    </div>
  )
}
MarbleDiagram.defaultProps = {
  width: 1000,
  height: 500,
  diagram: '--c-b-ed-(ad)-'
}
export { MarbleDiagram }
