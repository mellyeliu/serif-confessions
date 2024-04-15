import React from 'react';
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import '../PageLayout.css';
import TextScrubber from './TextScrubber';
import { formatDistanceToNow } from 'date-fns';

function StoryCard({ created_at, text, user_id }) {
    const [isMuted, setIsMuted] = React.useState(false);
    const url = "/images/clouds.jpeg"
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

    const date = new Date(created_at);

    const relativeTime = formatDistanceToNow(date, { addSuffix: true });

    return (
        <div className={'mobileSemiFull'} style={cardStyle}>
            <div style={{ display: "flex", height: 40 }}>
                <div style={timestampStyle}>{relativeTime}</div>
                <div onClick={toggleSound} style={iconStyle}>
                    {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
                </div>

            </div>
            <TextScrubber text={text} />
        </div>
    );
}

export default StoryCard;
