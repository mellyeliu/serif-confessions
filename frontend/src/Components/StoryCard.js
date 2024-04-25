import React, { useState, useRef, useEffect } from 'react';
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import '../PageLayout.css';
import TextScrubber from './TextScrubber';
import { formatDistanceToNow } from 'date-fns';
import Images from './Images';
import { useNavigate } from 'react-router-dom';
import AudioScrubber from './AudioScrubber';


function StoryCard({ created_at, text, user_id, image_urls, audio_url, id, full, is_user_card }) {
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = React.useState(true);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (audioRef.current && audio_url) {
          audioRef.current.src = audio_url;
          audioRef.current.load();
        }
      }, [audio_url]);

    const handleMouseDown = (e) => {
        setDragStart({
            x: e.clientX,
            y: e.clientY
        });
    };

    const audioRef = useRef(null);

    // Play audio when mouse enters the element
    const handleMouseEnter = () => {
        setIsMuted(false);
        if (audioRef.current.src) {
            console.log(audioRef.current.src)
            audioRef.current.play();
        }
    };

    // Pause audio when mouse leaves the element
    const handleMouseLeave = () => {
        setIsMuted(true);
        if (audioRef.current.readyState > 0) {
            if (audioRef.current.src) {
                audioRef.current.pause();
            }
        }
    };

    const handleSetCurrentTime = (time) => {
    if (audioRef.current.src) {
        audioRef.current.currentTime = time;
    }
    };


    const handleClick = (e) => {
        // Check if the mouse has moved more than a reasonable threshold
        if (!(Math.abs(dragStart.x - e.clientX) < 10 && Math.abs(dragStart.y - e.clientY) < 10)) {
            navigate(`/card/${id}`);
        }
    };
    // #F5F5DC
    const url = "/images/clouds.jpeg"
    const cardStyle = {
        borderRadius: '15px',
        overflow: 'hidden',
        border: '0.5px solid grey',
        margin: '20px',
        // backgroundImage: 'url(/images/paper.jpg)',
        // backgroundSize: 'cover',
        background: !!!is_user_card ? "#fff": "#F5EBE0", // White background
        width: full ? "50%" : "45%",
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        cursor: 'pointer',
        paddingBottom: 30,
        position: 'relative',
        // background: 'white',
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

    const toggleSound = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    }

    const handleImageClick = (e) => {
        e.stopPropagation();
    }

    const desktopItems = {
        a: { top: 25, left: 5, url: image_urls.length > 1 ? image_urls[0] : '/images/bg1.jpg', angle: -7 },
        b: { top: 0, left: 20, url: image_urls.length > 2 ? image_urls[1] : '/images/bg1.jpg', angle: 4 },
        c: { top: 20, left: 42, url: image_urls.length > 3 ? image_urls[2] : '/images/bg1.jpg', angle: -3 },
        d: { top: 2, left: 60, url: image_urls.length > 4 ? image_urls[3] : '/images/bg1.jpg', angle: 10 },
        e: { top: 28, left: 81, url: image_urls.length >= 5 ? image_urls[4] : '/images/bg1.jpg', angle: 4 },
    };

    const mobileItems = {
        a: { top: -10, left: -10, url: image_urls.length > 1 ? image_urls[0] : '/images/bg1.jpg', angle: -7 },
        b: { top: 7, left: 30, url: image_urls.length > 2 ? image_urls[1] : '/images/bg1.jpg', angle: 4 },
        c: { top: -14, left: 76, url: image_urls.length >= 3 ? image_urls[2] : '/images/bg1.jpg', angle: 8 },
    };

    const date = new Date(created_at);
    
    const relativeTime = formatDistanceToNow(date, { addSuffix: true });
    return (
        <div className={'StoryCard mobile75Full'} style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

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
            <div onClick={handleImageClick}>
            <AudioScrubber setMuted={setIsMuted} setCurrentTime={handleSetCurrentTime} audioRef={audioRef}  text={text} isMuted={isMuted}/>
            </div>

            <audio ref={audioRef}></audio>
        </div>
    );
}

export default StoryCard;
