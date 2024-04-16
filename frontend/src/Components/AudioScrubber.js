import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

function AudioScrubber({text, isMuted, setCurrentTime, audioRef}) {
  const words = text.split(" ");
  const numBars = 100;
  const [levels, setLevels] = useState(Array.from({ length: numBars }, () => Math.random() ));
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (!isMuted && audioRef.current) {
      interval = setInterval(() => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const scrubberPosition = (currentTime / duration) * containerRef.current.clientWidth;
        setScrubberPosition(scrubberPosition);
        // setLevels(levels.map(() => Math.random()));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isMuted]);


  const handleMouseDown = (event) => {
    audioRef.current.pause();
    const rect = containerRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const duration = audioRef.current.duration;
    const newTime = (clickPosition / containerRef.current.clientWidth) * duration;
    setCurrentTime(newTime);

    const onMouseMove = (moveEvent) => {
      const currentX = moveEvent.clientX - rect.left;
      const newScrubberPosition = Math.min(Math.max(currentX, 0), containerRef.current.clientWidth);
      const newTime = (newScrubberPosition / containerRef.current.clientWidth) * duration;
      setCurrentTime(newTime);
    };

    const onMouseUp = () => {
        audioRef.current.play();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const wordIndex = containerRef.current ? Math.min(Math.floor((scrubberPosition / containerRef.current.clientWidth) * numBars * (words.length / numBars)), words.length - 1) : 0;

  return (
    <div>
    <p style={{ width: '100%', color: 'black', marginTop: 30, marginBottom: 30 }}>
        {words.map((word, index) => (
            <>
                <span key={index} style={{ backgroundColor: index === wordIndex ? 'rgb(213 213 213)' : 'transparent' }}>
                    {word}
                </span><span> </span>
            </>
        ))}
    </p>
      <div ref={containerRef} style={{ width: "95%", marginRight: 'auto', marginLeft: 'auto', display: 'flex', height: '50px', gap: '2px', position: 'relative', userSelect: 'none' }}
        onMouseDown={handleMouseDown}>
            {/* <div onClick={toggleSound} style={iconStyle}>
                    {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
                </div> */}
            {/* <div style={{
              backgroundColor: 'black',
              borderRadius: '5px',
              width: '1px',
            }}/> */}
        {levels.map((level, index) => (
          <div
            key={index}
            style={{
              backgroundColor: index <= Math.floor(wordIndex * (numBars / words.length)) ? 'black' : 'grey',
              borderRadius: '5px',
              width: '2px',
              flexGrow: 1,
              transform: `scaleY(${level})`,
              transition: 'background-color 0.1s ease-in-out, transform 0.1s ease-in-out'
            }}
          />
        ))}
        {/* <div style={{
              backgroundColor: 'black',
              borderRadius: '5px',
              width: '1px',
            }}/> */}
      </div>
    </div>
  );
}

export default AudioScrubber;
