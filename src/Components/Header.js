import React from 'react';
import SquareButton from './SquareButton';

const buttonStyle = {
  padding: '10px 0px',
  width: 200,
  borderRadius: 20,
  background: 'black',
  color: 'white',
  margin: '10px 0px',
}

function Header() {
  return (
    <>
      <div className="body-row single one">
        <div style={{ color: "grey", float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '50%', alignItems: 'center' }}>
          <h3 style={{ marginBlockEnd: "0", }}>April 10, 2024</h3>
        </div>
      </div>
      <div className="body-row single one">
        <div style={{ float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '50%', alignItems: 'center' }}>
          <h2>Share the weirdest unexplainable incident that’s happened in your life</h2>
        </div>
      </div>
      <button style={buttonStyle}>Share your story</button>
    </>
  );
}

export default Header;
