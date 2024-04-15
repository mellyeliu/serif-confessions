import React, {useState, useEffect} from 'react';
import StoryCard from './StoryCard';
import { TestData } from '../TestData';
import '../PageLayout.css';
import { createClient } from "@supabase/supabase-js";

const StoryList = (props) => {
  const storyCards = props.confessions.map((data, index) => (
    <div style={{ marginTop: 30 }}>
      <StoryCard {...data} key={index} />
    </div>
  ));


  return (
    <div>
      {storyCards}
    </div>
  );
};

export default StoryList;
