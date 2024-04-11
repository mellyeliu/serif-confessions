import React, { useState } from 'react';
import Dialog from './Dialog';
import { BiSolidPencil } from "react-icons/bi";


const buttonStyle = {
  padding: '10px 0px',
  width: 200,
  borderRadius: 20,
  background: 'black',
  color: 'white',
  margin: '20px 0px',
}

const StoryHome = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleSubmit = () => {
    console.log('Submit your story...');
    handleCloseDialog(); // Optionally close dialog after submit
  };

  return (
    <div style={{ margin: "40px 0px" }}>
      <div className="body-row single one">
        <div style={{ color: "grey", float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '50%', alignItems: 'center' }}>
          <h4 style={{ marginBlockEnd: "0", }}>April 10, 2024</h4>
        </div>
      </div>
      <div className="body-row single one">
        <div style={{ marginTop: 15, float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '50%', alignItems: 'center' }}>
          <h2>Share the weirdest unexplainable incident that’s happened in your life</h2>
        </div>
      </div>
      <button onClick={handleOpenDialog} style={buttonStyle}><BiSolidPencil /> Share your story</button>
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default StoryHome;
