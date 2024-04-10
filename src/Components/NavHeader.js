import React from 'react';

const NavHeaderStyle = {
  display: 'flex',
}

const buttonStyle = {
  background: 'none',
  border: '1px solid black',
  borderRadius: 20,
  padding: '5px 10px'
}

function NavHeader() {
  return (
    <div style={NavHeaderStyle} className="nav-header">
      <div>
        SERIF
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <button style={buttonStyle}>Feed</button> <button style={buttonStyle}>Contact</button>
      </div>
    </div>
  );
}

export default NavHeader;
