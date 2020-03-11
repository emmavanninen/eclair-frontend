import React, { Component } from 'react'
import PlaySong from './PlaySong'
import { connect } from 'react-redux'
import { setCurrentAuthUser } from '../../redux/actions/actions'
import store from '../../redux/store/store'

class Session extends Component {
  componentDidMount() {
    let tokens = localStorage.getItem('spotifyToken')

    console.log(tokens)

    // let states = store.getState()
    // if (states.reducer.user.isAuth) {
    //     console.log(`redux states`, states)

    //     localStorage.setItem('spotifyToken', JSON.stringify(tokens))
    // }
  }

  render() {
    return <PlaySong />
  }
}

const mapStateToProps = state => ({
  auth: state.reducer
})

export default connect(mapStateToProps, {})(Session)
