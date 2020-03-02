import React from 'react';
import Nav from './components/Nav/Nav'
import Lightscreen from './components/Lightscreen/Lightscreen'
import Home from './components/Home/Home'
import './App.css';

function App() {
  return (
    <div className="App">
        <Nav/>
        <Lightscreen/>
        <Home/>
    </div>
  );
}

export default App;
