import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import Lightscreen from './components/Lightscreen/Lightscreen'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'
import Spinner from './components/Spinner/Spinner'

export default class App extends Component {

  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <Router>
            <React.Suspense fallback={<Spinner />}>
              <MainRouter />
            </React.Suspense>
          </Router>
          {/* <Lightscreen /> */}
          {/* <Nav />
        <Home /> */}
        </Provider>
      </div>
    )
  }
}
