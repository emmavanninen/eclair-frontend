import React, { Component } from 'react'
import SpotifyPlayer from './SpotifyPlayer'
import { connect } from 'react-redux'
import { setCurrentAuthUser, logout } from '../../redux/actions/actions'
import { checkAuth } from '../api/setAuth'
import store from '../../redux/store/store'

class Session extends Component {
  state = {
    isAuth: false
  }

  componentDidMount = async () => {
    const { setCurrentAuthUser } = this.props
    let tokens = await checkAuth()

    if (tokens) {
      let accessToken = JSON.parse(tokens)
      setCurrentAuthUser(accessToken)

      let states = store.getState()

      if (states.reducer.user.isAuth) {
        this.setState({
          isAuth: true
        })
      }
    } else {
      this.setState({
        isAuth: false
      })
    }
  }

  loginWithSpotify = () => {
    window.open(
      'http://localhost:8888/',
      'Login with Spotify',
      'width=600,height=600'
    )
  }

  logout = () => {
      //TODO: pause song if playing
    const { logout } = this.props
    logout()
    this.setState({
      isAuth: false
    })
  }

  render() {
    return this.state.isAuth ? (
      <>
        <button onClick={this.logout}>Logout</button>
        <SpotifyPlayer />
      </>
    ) : (
      <>
        <div>You need to login:</div>
        <button onClick={this.loginWithSpotify}>Login with Spotify</button>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.reducer
})

export default connect(mapStateToProps, {
  setCurrentAuthUser,
  logout
})(Session)
