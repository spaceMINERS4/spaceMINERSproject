
import './App.css'
import Header from './components/header/header'
import First from './pages/first/first';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Second from './pages/second/second';
//import SolarSystem from './components/3dModel/SolarSystem';


function App() {
    return (
      <div>{/* 
      <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <SolarSystem />
      </div> */}
      <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/second" element={<Second />} />
      </Routes>
    </Router>
      
      </div>
    );
}

export default App;
