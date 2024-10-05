import './App.css'
import First from './pages/first/first';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import Second from './pages/second/second';

function App() {
    return (

      <div>
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
