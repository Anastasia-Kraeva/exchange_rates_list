import React from 'react';

const Tooltip = ({text, coords}) => {
  return (
    <div
      className="popOver"
      style={{
        left: coords[0] - 20,
        top: coords[1] + 20,
        zIndex: 10,
      }}
    >
      {text}
    </div>
  )
}

export default Tooltip
