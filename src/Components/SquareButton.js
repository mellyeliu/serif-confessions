import React from 'react';

function SquareButton({ label }) {
  const buttonStyle = {
    display: 'block',
    padding: '20px 40px',
    backgroundColor: '#f0f0f0',
    border: '2px solid black',
    boxShadow: '-7px 7px 0px 0px rgba(0, 0, 0, 1)',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none', // Prevent text selection
    transition: 'transform 0.1s', // Smooth press effect
  };

  const handleMouseDown = (e) => {
    e.target.style.transform = 'translate(5px, -5px)';
  };

  const handleMouseUp = (e) => {
    e.target.style.transform = '';
  };

  return (
    <button
      style={buttonStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <span style={{textTransform: 'uppercase'}}>{label} </span>
    </button>
  );
}

export default SquareButton;
