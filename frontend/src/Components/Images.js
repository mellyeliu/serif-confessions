import React, { useState } from 'react';

const DraggableImage = ({ url, initialLeft, initialTop, angle }) => {
    const [position, setPosition] = useState({ left: initialLeft, top: initialTop });
    const [isDragging, setIsDragging] = useState(false);
    const [currentZ, setCurrentZ] = useState(1);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setCurrentZ(currentZ + 2); // bring current image to front
        e.preventDefault();
    };

    const onMouseMove = (e) => {
        if (isDragging) {
            const container = e.target.closest('.container');
            const deltaX = e.movementX / container.offsetWidth * 100;
            const deltaY = e.movementY / container.offsetHeight * 100;
            setPosition(prev => ({
                left: prev.left + deltaX,
                top: prev.top + deltaY
            }));
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const style = {
        position: 'absolute',
        left: `${position.left}%`,
        top: `${position.top}%`,
        cursor: 'grab',
        zIndex: currentZ,
        opacity: 1,
        transform: `rotate(${angle}deg)`,
        border: '0.5px solid grey',
    };

    return (
        <div
            style={style}
            onMouseDown={onMouseDown}
            onMouseMove={isDragging ? onMouseMove : null}
            onMouseUp={onMouseUp}
            onMouseLeave={isDragging ? onMouseUp : null}
            class="floating"
        >
            <img src={url} alt="Draggable item" style={{ width: '150px', height: '150px', display: 'block' }} draggable="false" />
        </div>
    );
};

const Container = ({ items }) => {
    const [currentZ, setCurrentZ] = useState(1);

    return (
        <div className="container" style={{ padding: "15px 0px", position: 'relative', width: '90%', height: '30vh', userSelect: 'none' }}>
            {Object.keys(items).map(key => {
                const { left, top, url, angle } = items[key];
                return (
                    <DraggableImage
                        key={key}
                        url={url}
                        initialLeft={left}
                        initialTop={top}
                        currentZ={currentZ}
                        setCurrentZ={setCurrentZ}
                        angle={angle}
                    />
                );
            })}
        </div>
    );
};

export default Container;
