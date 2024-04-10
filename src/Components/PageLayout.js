import React from 'react';
import StoryCard from './StoryCard';
import { TestData } from '../TestData';
import '../PageLayout.css'; // Assuming CSS is defined in PageLayout.css

const PageLayout = () => {
  return (
    <div>
      <StoryCard {...TestData[0]} />
      <StoryCard {...TestData[0]} />
      <StoryCard {...TestData[0]} />
      <StoryCard {...TestData[0]} />
    </div>
  );
};

export default PageLayout;
