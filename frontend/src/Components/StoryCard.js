import React from 'react';
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import '../PageLayout.css';
import TextScrubber from './TextScrubber';
import { formatDistanceToNow } from 'date-fns';
import Images from './Images';
import { useNavigate } from 'react-router-dom';


function StoryCard({ created_at, text, user_id, id }) {
    const navigate = useNavigate();
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
        cursor: 'pointer',
        paddingBottom: 30,
        position: 'relative',
        background: 'white',
        // backgroundImage: `url(${url})`,
        // backgroundSize: 'cover',
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

    const handleClick = (id) => {
        navigate(`/card/${id}`);
    };

    const desktopItems = {
        a: { top: 13, left: 5, url: '/images/bg1.jpg', angle: -7 },
        b: { top: 6, left: 20, url: '/images/bg1.jpg', angle: 4 },
        c: { top: 21, left: 45, url: '/images/bg1.jpg', angle: -3 },
        d: { top: 7, left: 60, url: '/images/bg1.jpg', angle: 10 },
        e: { top: 13, left: 75, url: '/images/bg1.jpg', angle: 4 },
    };

    const mobileItems = {
        a: { top: -10, left: 0, url: '/images/bg1.jpg', angle: -7 },
        b: { top: -5, left: 35, url: '/images/bg1.jpg', angle: 4 },
    };

    const date = new Date(created_at);

    const relativeTime = formatDistanceToNow(date, { addSuffix: true });

    return (
        <div className={'StoryCard mobileSemiFull'} style={cardStyle} onClick={() => handleClick(id)}>
            <div style={{ display: "flex", height: 40 }}>
                <div style={timestampStyle}>{relativeTime}</div>
                <div onClick={toggleSound} style={iconStyle}>
                    {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
                </div>
            </div>
            <div className="desktopImages">
                <Images items={desktopItems} />
            </div>
            <div className="mobileImages">
                <Images items={mobileItems} />
            </div>
            <TextScrubber text={text} />
        </div>
    );
}

export default StoryCard;
