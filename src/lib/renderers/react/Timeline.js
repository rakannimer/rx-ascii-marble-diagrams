import React from 'react'

const Timeline = ({ circleWidth, width }) => {
  const arrowWidth = circleWidth / 4
  return (
    <g>
      <line
        x1={0}
        y1={circleWidth * 2}
        x2={width - arrowWidth * 2}
        y2={circleWidth * 2}
        stroke="black"
        strokeWidth="0.2"
        markerEnd="url(#head)"
      />
      <polygon
        id="Triangle"
        stroke="#979797"
        fill="black"
        transform={`translate(${width - arrowWidth * 2} ${circleWidth * 1.5 +
          arrowWidth})`}
        points={`0 0 ${arrowWidth * 2} ${arrowWidth} 0 ${arrowWidth * 2}`}
      />
    </g>
  )
}

export { Timeline }
