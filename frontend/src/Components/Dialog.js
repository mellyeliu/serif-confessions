import React, { useState, useRef, useEffect } from 'react';

function Dialog({ isOpen, onClose, onSubmit, canSubmit }) {
    const [text, setText] = useState('');
    const [isConfirmation, setIsConfirmation] = useState(false);
    const dialogRef = useRef(null);
    const handleOverlayClick2 = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
          setIsConfirmation(false);
          onClose();
        }
      };
    useEffect(() => {
    document.addEventListener('mousedown', handleOverlayClick2);

    return () => {
        document.removeEventListener('mousedown', handleOverlayClick2);
    };
    }, []);

    if (!isOpen) {
        return null;
    };


    const handleChange = (event) => {
        setText(event.target.value);
    };

    // Calculate the number of words directly in the render method to ensure updates
    const calculateWordCount = (text) => {
        // Trim leading and trailing spaces to avoid empty matches in split array
        if (text.length === 0) return 0;
        const words = text.trim().split(/\s+/);  // Split by any whitespace
        return words.length;
    };

    const wordCount = calculateWordCount(text);
    const maxWords = 150;


    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevents click inside dialog from closing it
    };

    const isOverLimit = wordCount > maxWords;

    const wordCountColor = wordCount > maxWords ? 'red' : 'rgb(150,150,150)';

    const handleLocalSubmit = (text) => {
        setIsConfirmation(true);
        onSubmit(text);
    }

    const handleConfirmSubmit = () => {
        setIsConfirmation(false);
    }

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    };

    const dialogStyle = {
        width: '50%',
        padding: '30px 10px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    };

    const inputStyle = {
        padding: '15px 10px 25px 10px',
        margin: '10px 0',
        fontSize: '12px',
        width: '100%',
        borderRadius: 20,
        resize: 'none',
        border: 'none',
        background: '#f6f6f6',
        minHeight: 150,
    }

    const submitButtonStyle = {
        padding: '13px 0px',
        width: 200,
        borderRadius: 20,
        background: (isOverLimit || !canSubmit) ? 'grey' : 'black',
        cursor: (isOverLimit || !canSubmit) ? 'not-allowed' : 'pointer',
        color: 'white',
        margin: '10px 0px',
        border: 'none'
    }

    const closeButtonStyle = {
        float: 'right',
        cursor: 'pointer',
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
           {!isConfirmation ? (<div className="mobileSemiFull" style={dialogStyle} onClick={handleOverlayClick}>
                <h3>Visualize your story</h3>
                {!canSubmit && (<div style={{ marginTop: 5, textAlign: 'center', fontSize: 11, color: 'red' }}>You can only submit one confession a day. Check out other confessions and come back tomorrow for a new prompt!</div>)}
                <div style={{ position: 'relative', width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <textarea type="text" value={text} onChange={handleChange} style={inputStyle} />
                    <div style={{ fontSize: 11, position: 'absolute', bottom: '22px', right: '0px', color: wordCountColor }}>
                        {wordCount}/{maxWords} words
                    </div>
                </div>
                <button disabled={wordCount > maxWords || !canSubmit} onClick={() => handleLocalSubmit(text)}  style={submitButtonStyle}>Post</button>
                <div style={{ marginTop: 5, textAlign: 'center', fontSize: 11, color: 'grey' }}>You cannot edit this after posting</div>
            </div>) :
            (<div className="mobileSemiFull" style={dialogStyle} disabled={!canSubmit} ref={dialogRef}>
            <h3>Thanks for your confession.</h3>
                <div style={{ position: 'relative', width: '85%', marginLeft: 'auto', marginRight: 'auto', padding: 15, fontFamily: "Sedan"}}>
                    Your confession is being sent out. It will soon be released into the world.
                </div>
                <div style={{ position: 'relative', width: '85%', marginLeft: 'auto', marginRight: 'auto', padding: 15, fontFamily: "Sedan"}}>
                    In the meantime, check out <a href="https://www.serif.app/" style={{textDecoration: null, color: 'inherit'}}>Serif: Tiktok meets Goodreads</a>, an immersive audiovisual reading experience.
                </div>
                <button disabled={wordCount > maxWords} onClick={() => handleConfirmSubmit()}  style={submitButtonStyle}>Close</button>
            </div>) }
        </div>
    );
}

export default Dialog;
