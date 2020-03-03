import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store/store'
import Nav from './components/Nav/Nav'
import Lightscreen from './components/Lightscreen/Lightscreen'
import Home from './components/Home/Home'
import './App.css';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Nav />
        <Lightscreen />
        <Home />
      </Provider>
    </div>
  )
}

export default App;
