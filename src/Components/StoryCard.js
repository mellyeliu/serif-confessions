import React from 'react';

function StoryCard({ timestamp, paragraph, imageUrl }) {
    // Inline CSS for the StoryCard component
    const cardStyle = {
        borderRadius: '15px', // Rounded corners
        overflow: 'hidden', // Ensures content respects border radius
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Optional: adds a shadow for depth
        margin: '20px',
        background: '#fff', // White background
        maxWidth: '300px', // Adjust width as needed
        maxWidth: "75%",
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px',
    }

    // Inline CSS for the timestamp
    const timestampStyle = {
        position: 'absolute', // Positions timestamp in the top left corner
        top: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
        padding: '5px 10px',
        borderRadius: '10px', // Rounded corners for the timestamp
        fontSize: '12px',
    };

    // Inline CSS for the paragraph
    const paragraphStyle = {
        padding: '20px',
        textAlign: 'center',
        width: '100%',
    };

    // Inline CSS for the image
    const imageStyle = {
        width: '100%', // Ensures the image covers the width of the card
        display: 'block', // Removes bottom space/margin under the image
        borderTop: '1px solid #eee', // Separates image from text visually
    };

    return (
        <div style={cardStyle}>
            {/* <div style={timestampStyle}>{timestamp}</div> */}
            <span style={paragraphStyle}>{paragraph}</span>
            {/* <img src={imageUrl} style={imageStyle} /> */}
        </div>
    );
}

export default StoryCard;
