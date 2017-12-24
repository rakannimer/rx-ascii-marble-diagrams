import React from 'react'
const Rectangle = ({ width, children }) => {
  const mult = 2
  return (
    <g>
      <rect
        key={`Rectangle`}
        width={width * mult}
        height={width}
        fill="#DDDDDD"
        x={0}
        y={0}
        textAnchor="middle"
      />
      <text key={`text`} x="0" y="60%" fill="black" fontSize="80%">
        {children}
      </text>
    </g>
  )
}
export { Rectangle }
