import React from 'react'
const Circle = ({ r, children }) => {
  return [
    <circle
      key={`circle`}
      r={r}
      fill="#DDDDDDEE"
      cx={r}
      cy={r}
      textAnchor="middle"
    />,
    <text
      key={`text`}
      x="50%"
      y="60%"
      textAnchor="middle"
      fill="black"
      fontSize="80%"
    >
      {children}
    </text>
  ]
}
export { Circle }
