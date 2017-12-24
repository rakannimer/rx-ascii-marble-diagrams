import React from 'react'

const TimelineSVG = props => {
  const { circleWidth, width } = props
  const arrowWidth = circleWidth / 4
  return (
    <svg width={width} height={100} {...props}>
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
    </svg>
  )
}
const Timeline = props => {
  const { circleWidth, width, arrowColor, marginTop } = props
  const arrowWidth = circleWidth
  return (
    <div
      style={{
        zIndex: 0,
        marginTop: marginTop, // circleWidth * 2 - arrowWidth / 4,
        position: 'absolute'
      }}
    >
      <div
        key="line"
        style={{
          position: 'absolute',
          width: width - arrowWidth,
          backgroundColor: 'black',
          height: 2,
          // marginTop: arrowWidth / 4,
          zIndex: 0
          // marginTop: arrowWidth / 2
        }}
      />
      <div
        key="arrow"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderTop: `${arrowWidth / 4}px solid transparent`,
          borderBottom: `${arrowWidth / 4}px solid transparent`,
          borderRight: `${arrowWidth / 4}px solid transparent`,
          borderLeft: `${arrowWidth / 4}px solid ${arrowColor}`,
          marginTop: -arrowWidth / 4,
          marginLeft: width - arrowWidth,
          zIndex: 0
        }}
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
export { Timeline, TimelineSVG }
