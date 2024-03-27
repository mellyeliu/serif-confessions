import React from 'react';
import NavHeader from './NavHeader';
import Waitlist from './Waitlist';
import '../PageLayout.css'; // Assuming CSS is defined in PageLayout.css

const PageLayout = () => {
  return (
    <div className="page-container">
      <NavHeader />
      <div className="body-container">
        <Waitlist />
        <div className="body-row double two">
          <div style={{backgroundColor: "#ECF5FF"}} className="nested-div">
          </div>
          <div className="nested-div">
          <div style={{float: 'left', width: '40%'}}>
          <h2>"It’s Tiktok meets Goodreads: a brand new way to read the world’s best stories.”</h2>
        </div>
        <div style={{float: 'right', width: '50%', paddingTop: 150, paddingRight: 50}}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas. Nam aliquam sem et tortor. Ipsum a arcu cursus vitae congue mauris rhoncus. </p>
        </div>
        <div style={{clear: 'both'}}></div>
          </div>
        </div>
        <div className="body-row triple three">
          <div className="nested-div">
            <h2>Read stories that move you.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas. Nam aliquam sem et a tinciin.</p>
            </div>
          <div style={{backgroundColor: "#FEFADE"}} className="nested-div"></div>
          <div className="nested-div">
          <h2>Connect to a global audience.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas. Nam aliquam sem et a tinciin.</p>
          </div>
        </div>
        <div className="body-row double four">
          <div className="nested-div">
          <div style={{float: 'left', width: '50%'}}>
          <h2>We make reading an easy daily habit.</h2>
        </div>
        <div style={{float: 'right', width: '30%', paddingTop: 150, paddingRight: 50}}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas. Nam aliquam sem et tortor. Ipsum a arcu cursus vitae congue mauris rhoncus. </p>
        </div>
        <div style={{clear: 'both'}}></div>
          </div>
          <div style={{backgroundColor: "#E5E4FC"}} className="nested-div"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
