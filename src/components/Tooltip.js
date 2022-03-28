import React from 'react';

const Tooltip = ({text, coords}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: coords[0] - 20,
        top: coords[1] + 20,
        backgroundColor: '#fff',
        padding: '8px',
        zIndex: 10,
      }}
    >
      {text}
    </div>
  )
}

export default Tooltip
