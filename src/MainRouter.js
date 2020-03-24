import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Nav from './components/Nav/Nav'

const Home = React.lazy(() => import('./components/Home/Home'))
const Login = React.lazy(() => import('./components/Login/Login'))
const Screen = React.lazy(() => import('./components/p5/Screen/Screen'))

export default class MainRouter extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route exact path='/screen' component={Screen}></Route>
        </Switch>
      </div>
    )
  }
}
