import React from 'react';
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import '../PageLayout.css';
import TextScrubber from './TextScrubber';

function StoryCard({ timestamp, paragraph, url }) {
    const [isMuted, setIsMuted] = React.useState(false);

    const cardStyle = {
        borderRadius: '15px',
        overflow: 'hidden',
        // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        margin: '20px',
        background: '#fff', // White background
        width: "40%",
        minHeight: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
        position: 'relative',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat'
    }

    const timestampStyle = {
        color: 'grey',
        float: 'left',
        fontSize: '12px',
    };

    const paragraphStyle = {
        textAlign: 'left',
        float: 'left',
        width: '100%',
        fontFamily: "Source Serif 4, serif",
    };

    const iconStyle = {
        marginLeft: 'auto',
        cursor: 'pointer',
    }

    const imageStyle = {
        width: '100%',
        display: 'block',
        borderTop: '1px solid #eee',
    };

    const toggleSound = () => {
        setIsMuted(!isMuted);
    }


    return (
        <div className={'StoryCard mobileSemiFull'} style={cardStyle}>
            <div style={{ display: "flex", height: 40 }}>
                <div style={timestampStyle}>{timestamp}</div>
                <div onClick={toggleSound} style={iconStyle}>
                    {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
                </div>

            </div>
            {/* <span style={paragraphStyle}>{paragraph}</span> */}
            <TextScrubber text={paragraph} />
            {/* <img src={url} /> */}
        </div>
    );
}

export default StoryCard;
