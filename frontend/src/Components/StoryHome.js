import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { BiSolidPencil } from "react-icons/bi";
import { createClient } from "@supabase/supabase-js";
import DatePicker from './DatePicker';
import {useData} from './DataContext';

const buttonStyle = {
  padding: '14px 0px',
  width: 200,
  borderRadius: 20,
  background: 'black',
  color: 'white',
  margin: '20px 0px',
  cursor: 'pointer',
  border: 'none'
}

const supabase = createClient("https://kovldxcnymhyquwknlln.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdmxkeGNueW1oeXF1d2tubGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNTUyNjgsImV4cCI6MjAyODczMTI2OH0.DH6euAm3PP4dFjKLCw2dWwA_A7hAzEzyw_LBfsM46x8");

const StoryHome = (props) => {
  const { prompt, date, setDate, setConfessions, setPrompt, confessions } = useData();
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const currentDate = today.toLocaleDateString('en-US', options);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newFormattedDate = newDate.toLocaleDateString('en-US', options);
    setDate(newFormattedDate);
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleSubmit = () => {
    console.log('Submit your story...');
    handleCloseDialog();
  };

  return (
    <div style={{ margin: "30px 0px" }}>
      <div className="body-row single one">
        <DatePicker today={currentDate} date={date} changeDate={changeDate}/>
        {/* <div style={{ color: "grey", float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '50%', alignItems: 'center' }}>
          <h4 style={{ marginBlockEnd: "0", }}>{formattedDate}</h4>
        </div> */}
      </div>
      <div className="body-row single one">
        <div className="mobileFull" style={{ cursor: 'default', marginTop: 15, float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '40%', alignItems: 'center' }}>
          <h2>{props.prompt}</h2>
        </div>
      </div>
      <button className="animated-button" onClick={handleOpenDialog} style={buttonStyle}><BiSolidPencil /> Share your story</button>
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default StoryHome;
