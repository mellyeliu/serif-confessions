import React, { useState, useRef, useEffect } from 'react';

function InitialInfoPopup({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    };

    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevents click inside dialog from closing it
    };

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

    const submitButtonStyle = {
        padding: '13px 0px',
        width: 200,
        borderRadius: 20,
        background: 'black',
        cursor: 'pointer',
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
            (<div className="mobileSemiFull" style={dialogStyle} onClick={handleOverlayClick}>
                <h3>Serif Confessions</h3>
                <div style={{ position: 'relative', width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                    Immerse yourself in heartfelt confessions from around the world. 
                </div>
                <div style={{ position: 'relative', width: '85%', marginLeft: 'auto', marginRight: 'auto', fontSize:"12px", marginTop: "12px", marginBottom: "12px" }}>
                   Note: Serif Confessions is best enjoyed with audio. We recommend that you turn your speakers on for this experience. 
                </div>
                <button onClick={() => onClose()}  style={submitButtonStyle}>OK</button>
            </div>
        </div>
    );
}

export default InitialInfoPopup;
