import React, { useState, useRef } from 'react';
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import '../PageLayout.css';
import TextScrubber from './TextScrubber';
import { formatDistanceToNow } from 'date-fns';
import Images from './Images';
import { useNavigate } from 'react-router-dom';


function StoryCard({ created_at, text, user_id, audio_file, id }) {
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = React.useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragStart({
            x: e.clientX,
            y: e.clientY
        });
    };

    const audioRef = useRef(null);

    // Play audio when mouse enters the element
    const handleMouseEnter = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    // Pause audio when mouse leaves the element
    const handleMouseLeave = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };


    const handleClick = (e) => {
        // Check if the mouse has moved more than a reasonable threshold
        if (!(Math.abs(dragStart.x - e.clientX) < 10 && Math.abs(dragStart.y - e.clientY) < 10)) {
            navigate(`/card/${id}`);
        }
    };

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

    const handleImageClick = (e) => {
        e.stopPropagation();
    }

    // const handleClick = (id) => {
    //     navigate(`/card/${id}`);
    // };

    const desktopItems = {
        a: { top: 13, left: 5, url: '/images/bg1.jpg', angle: -7 },
        b: { top: 0, left: 20, url: '/images/bg1.jpg', angle: 4 },
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
        <div className={'StoryCard mobileSemiFull'} style={cardStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div style={{ display: "flex", height: 40 }}>
                <div style={timestampStyle}>{relativeTime}</div>
                <div onClick={toggleSound} style={iconStyle}>
                    {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
                </div>
            </div>
            <div className="desktopImages" onClick={handleImageClick}>
                <Images items={desktopItems} />
            </div>
            <div className="mobileImages" onClick={handleImageClick}>
                <Images items={mobileItems} />
            </div>
            <TextScrubber text={text} />
            <audio ref={audioRef} src={audio_file}></audio>
        </div>
    );
}

export default StoryCard;
