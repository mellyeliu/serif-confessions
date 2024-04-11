import React, { useState } from 'react';
import '../PageLayout.css';

const TextScrubber = ({ text }) => {
    const words = text.split(' ');
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const handleScrubberChange = (event) => {
        setHighlightedIndex(parseInt(event.target.value, 10));
    };

    return (
        <div>
            <p style={{ width: '100%', color: 'black' }}>
                {words.map((word, index) => (
                    <span key={index} style={{ backgroundColor: index === highlightedIndex ? 'lightgrey' : 'transparent' }}>
                        {word + ' '}
                    </span>
                ))}
            </p>
            <input
                type="range"
                min="0"
                max={words.length - 1}
                value={highlightedIndex}
                onChange={handleScrubberChange}
                className="scrubber"
            />
        </div>
    );
};

export default TextScrubber;
