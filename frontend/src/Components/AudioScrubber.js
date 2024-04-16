import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

function AudioScrubber({text, isMuted}) {
  const words = text.split(" ");
  const numBars = 100;
  const [levels, setLevels] = useState(Array.from({ length: numBars }, () => Math.random() ));
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (!isMuted) {
      interval = setInterval(() => {
        setLevels(levels.map(() => Math.random() * 0.95 + 0.05));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isMuted]);


  const handleMouseDown = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    setScrubberPosition(clickPosition);

    const onMouseMove = (moveEvent) => {
      if (!containerRef.current) return;
      const currentX = moveEvent.clientX - rect.left;
      const deltaX = currentX - clickPosition;
      const newScrubberPosition = Math.min(Math.max(clickPosition + deltaX, 0), containerRef.current.clientWidth);
      setScrubberPosition(newScrubberPosition);
    };

    const onMouseUp = () => {
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
