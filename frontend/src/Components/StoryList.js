import React, { useState, useEffect } from 'react';
import StoryCard from './StoryCard';
import { TestData } from '../TestData';
import '../PageLayout.css';
import { createClient } from "@supabase/supabase-js";

const StoryList = (props) => {
  const storyCards = props.confessions.map((data, index) => {
    let audio_file = "audio/confession1.wav"
    if (index === 1) {
      audio_file = "audio/confession2.wav"
    } else if (index === 2) {
      audio_file = "audio/confession3.wav"
    }
    return (
    <div style={{ marginTop: 30 }}>
      <StoryCard {...data} audio_file={audio_file} key={index} />
    </div>
    )}
  );


  return (
    <div>
      {storyCards}
    </div>
  );
};

export default StoryList;
