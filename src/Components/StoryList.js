import React from 'react';
import StoryCard from './StoryCard';
import { TestData } from '../TestData';
import '../PageLayout.css'; // Assuming CSS is defined in PageLayout.css

const StoryList = () => {
  const storyCards = TestData.map((data, index) => (
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
