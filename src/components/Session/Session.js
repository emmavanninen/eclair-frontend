import React, { Component } from 'react'
import SpotifyPlayer from './SpotifyPlayer'
import { connect } from 'react-redux'
import * as $ from 'jquery'
import {
  setCurrentAuthUser,
  logout,
  setTrackUris,
} from '../../redux/actions/actions'
import { checkAuth } from '../api/setAuth'
// import { createNewSession } from '../api/axios'
import store from '../../redux/store/store'

class Session extends Component {
  state = {
    token: null,
    isAuth: false,
    user: {
      name: null,
      email: null,
    },
  }

  componentDidMount = async () => {
    const { setCurrentAuthUser } = this.props
    let tokens = await checkAuth()
    if (tokens) {
      let accessToken = JSON.parse(tokens)
      await this.getSpotifyUser(accessToken)

      try {
        setCurrentAuthUser(accessToken, this.state.user)
        let states = store.getState()

        if (states.reducer.userInfo.isAuth) {
          this.setState({
            token: states.reducer.userInfo.token,
            isAuth: true,
            player: (
              <SpotifyPlayer
                user={this.state.user}
                isAuth={this.state.isAuth}
                token={this.state.token}
              />
            ),
          })
        } else {
          this.setState({
            isAuth: false,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  getSpotifyUser = async (token) => {
    await $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: (data) => {
        this.setState({
          isAuth: true,
          user: {
            name: data.display_name,
            email: data.email,
          },
        })
      },
    })
  }

  loginWithSpotify = () => {
    window.open(
        'http://localhost:8888',
    //   'http://spotifylogin.surge.sh',
      'Login with Spotify',
      'width=600,height=600'
    )
  }

  logout = () => {
    //TODO: pause song if playing
    const { logout } = this.props
    logout()
    this.setState({
      isAuth: false,
    })
  }

  newSession = async (user) => {
    let states = store.getState()

    console.log(`states.uris`, states.uris)

    // let success = await createNewSession(user)
    // try {
    //   console.log(`success data`, success.data)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  render() {
    return (
      <div className='session-login'>
        {this.state.isAuth ? (
          <>
            <button onClick={this.logout}>Logout</button>
            {this.state.player}
          </>
        ) : (
          <>
            <div>You need to login:</div>
            <button onClick={() => this.loginWithSpotify()}>
              Login with Spotify
            </button>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.reducer,
})

export default connect(mapStateToProps, {
  setCurrentAuthUser,
  logout,
  setTrackUris,
})(Session)
