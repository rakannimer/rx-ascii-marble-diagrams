import React from 'react'
import { Circle } from './Circle'

const MarbleContainer = ({
  token: { type, char },
  i,
  width,
  paddingPercentage,
  children
}) => {
  let marble
  switch (type) {
    case 'EMPTY_FRAME':
      marble = null // <Circle r={width}>-</Circle>
      break
    case 'GROUP':
      marble = (
        <Circle r={width}>({char.map(({ char: value }) => value)})</Circle>
      )
      break
    default:
      marble = <Circle r={width}>{char}</Circle>
  }
  return (
    <svg
      width={width * 2}
      height={width * 2}
      x={width + width * 2 * i + paddingPercentage * width * i}
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
