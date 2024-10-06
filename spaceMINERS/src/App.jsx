import './App.css'
import '../src/assets/css/customerCursor.css';

import First from './pages/first/first';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import Second from './pages/second/second';
import Third from './pages/third/third';
import VideoPlayer from './pages/fourth/fourth';

function App() {
    return (

      <div className="custom-cursor">
      <Router>
        <Routes>
        <Route path="/" element={<First />} />
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third />} />
        <Route path="/fourth" element={<VideoPlayer />} />
        
        </Routes>
      </Router>
      </div>

    );
}

export default App;
