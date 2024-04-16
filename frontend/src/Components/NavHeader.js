import React from 'react';
import { useNavigate } from 'react-router-dom';


const NavHeaderStyle = {
  display: 'flex',
}

const buttonStyle = {
  background: 'none',
  border: '1px solid black',
  borderRadius: 20,
  padding: '5px 10px',
  marginLeft: 10,
  cursor: 'pointer',
}


function NavHeader() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/`);
  };

  return (
    <div style={NavHeaderStyle} className="nav-header mobileSnapBuffer">
      <div className="Logo" style={{ cursor: 'pointer' }} onClick={handleClick}>
        <div className="Editorial" style={{ letterSpacing: -0.5, fontSize: 24, color: 'black'}}>serif</div>
        {/* <img style={{ cursor: 'pointer' }} onClick={handleClick} src="/images/serif.png" /> */}
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <button onClick={handleClick} className="header-button" style={buttonStyle}>Feed</button> <button className="header-button" style={buttonStyle}>Contact</button>
      </div>
    </div>
  );
}

export default NavHeader;
