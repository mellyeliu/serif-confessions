import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import InitialInfoPopup from './InitialInfoPopup';
import { BiSolidPencil } from "react-icons/bi";
import DatePicker from './DatePicker';
import {useData} from './DataContext';

import {isDev} from '../helper';
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

const StoryHome = (props) => {
  const { date, setDate, visitorId } = useData();
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const currentDate = today.toLocaleDateString('en-US', options);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInitialPopupOpen, setIsInitialPopupOpen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newFormattedDate = newDate.toLocaleDateString('en-US', options);
    setDate(newFormattedDate);
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleCloseInitialInfoPopup = () => setIsInitialPopupOpen(false);
  const handleSubmit = (text) => {
    setTimeout(() => setShowConfirmation(false), 3000);
    const endpoint = isDev ? "http://127.0.0.1:5000/confessions" : "https://serif-confessions-aa78f08a8671.herokuapp.com/"
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            prompt_id: props.prompt.id,
            text: text,
            user_id: visitorId
        })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      } else {}
      return response.json();
    })
    .then(data => {
        console.log(data);
    })
  };

  return (
    <div style={{ margin: "30px 0px" }}>
      <div className="body-row single one">
        <DatePicker today={currentDate} date={date} changeDate={changeDate}/>
      </div>
      <div className="body-row single one">
        <div className="mobileFull" style={{ cursor: 'default', marginTop: 15, float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '40%', alignItems: 'center' }}>
          <h2>{props.prompt ? props.prompt.text : ""}</h2>
        </div>
      </div>
      <button className="animated-button" onClick={handleOpenDialog} style={buttonStyle}><BiSolidPencil /> Share your story</button>
      {/* {showConfirmation && <div className="confirmation">Your confession has been recorded. Thank you for releasing it into the world.</div>} */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        canSubmit={canSubmit}
      />
      <InitialInfoPopup
        isOpen={isInitialPopupOpen}
        onClose={handleCloseInitialInfoPopup}
      />
    </div>
  );
}

export default StoryHome;
