import React from 'react'
import { Circle } from './Circle'
import { Rectangle } from './Rectangle'

const MarbleContainer = ({
  token: { type, char },
  i,
  width,
  paddingPercentage,
  children
}) => {
  let marble
  const typeWidth = type === 'GROUP' ? width * 8 : width * 2
  switch (type) {
    case 'EMPTY_FRAME':
      marble = null // <Circle r={width}>-</Circle>
      break
    case 'GROUP':
      marble = (
        <Circle r={width}>({char.map(({ char: value }) => value)})</Circle>
      )
      break
    case 'OPERATOR':
      marble = (
        <Rectangle width={typeWidth}>
          {char.map(({ char: value }) => value)}
        </Rectangle>
      )
      break
    default:
      marble = <Circle r={width}>{char}</Circle>
  }

  return (
    <svg
      width={typeWidth}
      height={typeWidth}
      x={width + typeWidth * i + paddingPercentage * width * i}
      y={width}
      key={`marble_${i}`}
    >
      {marble}
    </svg>
  )
}

MarbleContainer.defaultProps = {
  token: { type: 'EMPTY_FRAME', char: 'default' },
  width: 50,
  paddingPercentage: 0.2
}

export { MarbleContainer }
