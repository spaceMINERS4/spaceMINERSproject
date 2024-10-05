import './App.css';
import Header from './components/header/header';
import NEOVisualization from './components/3Dmodel/asteroid.jsx';
import React from 'react';

function App() {
    return (
        <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
            <Header />
            <NEOVisualization />
        </div>
    );
}

export default App;
