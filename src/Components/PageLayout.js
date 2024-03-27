import React from 'react';
import '../PageLayout.css'; // Assuming CSS is defined in PageLayout.css

const PageLayout = () => {
  return (
    <div className="page-container">
      <div className="nav-header">
        Navigation Header
      </div>
      <div className="body-container">
        <div className="body-row single one">
        <h2>Navigation Header</h2>
        </div>
        <div className="body-row double two">
          <div style={{backgroundColor: "#ECF5FF"}} className="nested-div">
            <h2>Navigation Header</h2>
            <p>Body text</p>
          </div>
          <div className="nested-div">
            <h2>Navigation Header</h2>
            <p>Body text</p>
          </div>
        </div>
        <div className="body-row triple three">
          <div className="nested-div">
            <h2>It’s Tiktok meets Goodreads: a brand new way to read the world’s best stories.”</h2>
            <p>Third Row, Div 1</p>
            </div>
          <div style={{backgroundColor: "#FEFADE"}} className="nested-div">Third Row, Div 2</div>
          <div className="nested-div">Third Row, Div 3</div>
        </div>
        <div className="body-row double four">
          <div className="nested-div">Fourth Row, Div 1</div>
          <div style={{backgroundColor: "#E5E4FC"}} className="nested-div">Fourth Row, Div 2</div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
