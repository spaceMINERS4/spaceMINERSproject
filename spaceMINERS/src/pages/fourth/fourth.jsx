// src/VideoPlayer.js
import React from 'react';
import './fourth.css';
import bg from "../../assets/bg.jpg"

import animationGif from '../../../../AI/celestial_animation.gif';
import Header from '../../components/header/header';

const VideoPlayer = () => {
    return (
        <div>
        <Header/>
        <div className="allAboutUs">
            
            <img className="bg1" src={bg} alt="" />
            <h5>Near-Earth Comets Motion Animation</h5>
            
            <img src={animationGif} alt="CelestialAnimation" width="640" height="480" />
        </div>
        </div>
    );
};

export default VideoPlayer;
