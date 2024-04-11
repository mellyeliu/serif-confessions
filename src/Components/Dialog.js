import React from 'react';

function Dialog({ isOpen, onClose, onSubmit }) {
    if (!isOpen) {
        console.log("noneee");
        return null;
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
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        width: '75%',
        padding: '10px',
        margin: '20px 0',
        fontSize: '16px',
        borderRadius: 20,
        border: 'none',
        background: '#f6f6f6',
        minHeight: 100,
    }

    const submitButtonStyle = {
        padding: '10px 0px',
        width: 200,
        borderRadius: 20,
        background: 'black',
        color: 'white',
        margin: '10px 0px',
    }

    const closeButtonStyle = {
        float: 'right',
        cursor: 'pointer',
    };

    const handleOverlayClick = (e) => {
        e.stopPropagation(); // Prevents click inside dialog from closing it
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={dialogStyle} onClick={handleOverlayClick}>
                <div style={closeButtonStyle} onClick={onClose}>X</div>
                <h3>Visualize your story</h3>
                <input type="text" style={inputStyle} />
                <button onClick={onSubmit} style={submitButtonStyle}>Submit</button>
            </div>
        </div>
    );
}

export default Dialog;
