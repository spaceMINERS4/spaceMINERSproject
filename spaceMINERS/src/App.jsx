import './App.css'
import First from './pages/first/first';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import Second from './pages/second/second';
import Third from './pages/third/third';

function App() {
    return (

      <div>
      <Router>
        <Routes>
        <Route path="/" element={<First />} />
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third />} />
        </Routes>
      </Router>
      </div>

    );
}

export default App;
