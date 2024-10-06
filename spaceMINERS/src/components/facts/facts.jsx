// facts.jsx
import React, { useState, useEffect } from 'react';
import './facts.css';
import { solarSystemFacts } from '../../assets/data/solarsystemfacts';

const Facts = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0); 
  const [fadeIn, setFadeIn] = useState(true); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false); 
      setTimeout(() => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % solarSystemFacts.length); 
        setFadeIn(true); 
      }, 1000); 
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  const currentFact = solarSystemFacts[currentFactIndex]; 
  
  return (
    <div className='facts01'>
      <div className={`facts02 ${fadeIn ? 'fade-in' : ''}`}>
        {currentFact.planet || currentFact.celestialBody}
      </div>
      <div className={`facts03 ${fadeIn ? 'fade-in' : ''}`}>
        {currentFact.fact}
      </div>
    </div>
  );
};

export default Facts;
