// src/VideoPlayer.js
import React from 'react';

const VideoPlayer = () => {
    return (
        <div>
            <h1>Celestial Animation</h1>
            <video width="640" height="480" controls>
                <source src="/animation" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
