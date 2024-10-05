
import './App.css'
import Header from './components/header/header'
import SolarSystem from './components/3Dmodel/model';
import React from 'react';


function App() {
    return (
      <div>{/* 
      <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <SolarSystem />
      </div> */}
      <div>
        <Header/>
        <SolarSystem/>
      </div></div>
    );
}

export default App;
