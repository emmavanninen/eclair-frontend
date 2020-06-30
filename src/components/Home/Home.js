import React, { Component } from 'react'
import Session from '../Session/Session'
import store from '../../redux/store/store'
import { checkAuth } from '../api/setAuth'

export default class Home extends Component {
  componentDidMount = async() =>{
      let tokens = await checkAuth()
      console.log('home token', tokens)
    let states = store.getState()
    console.log(`home redux states`, states)
  }

  render() {
    return <div></div>
    // <Session />
  }
}
