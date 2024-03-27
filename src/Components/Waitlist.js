import React from 'react';
import SquareButton from './SquareButton';

function Waitlist() {
  return (
    <div className="body-row single one">
    <div style={{float: 'left', width: '50%', display: 'flex', alignItems: 'center'}}>
      <h2>Find your next favourite story.</h2>
    </div>
    <div style={{float: 'right', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'stretch'}}>
    <h3>Discover 10,000+ stories at your fingertips.
An immersive experience built for the future of reading. </h3>
      <SquareButton label={'Join the Waitlist'}/>
    </div>
    <div style={{clear: 'both'}}></div>
    </div>
  );
}

export default Waitlist;
