import React from 'react';
import StoryCard from './StoryCard';
import '../PageLayout.css';

const StoryList = (props) => {
  const storyCards = props.confessions.map((data, index) => {
    return (
    <div className="mobileSnapItem" style={{ marginTop: 30 }}>
      <StoryCard {...data} key={index} full={false} />
    </div>
    )}
  );


  return (
    <div className="mobileSnap">
      {storyCards}
    </div>
  );
};

export default StoryList;
