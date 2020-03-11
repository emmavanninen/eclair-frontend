import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as $ from 'jquery'
import store from '../../redux/store/store'

class PlaySong extends Component {
  state = {
    nowPlaying: {
      name: 'unknown',
      image: 'unknown'
    },
    user: {
      name: '',
      email: ''
    }
  }

  componentDidMount() {
    //   this.getSpotifyUser()
  }

  componentDidUpdate(prevProp, prevState) {
    console.log('update poop')
    console.log(prevProp)
  }

  getHashParams = async () => {
    const hashParams = {}
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)

    while ((e = r.exec(q))) {
      hashParams[e[1]] = await decodeURIComponent(e[2])
    }
    try {
      if (window.location.hash) {
        this.setState({
          isAuth: true,
          token: hashParams
        })
        // localStorage.setItem('spotifyToken', hashParams.access_token)
        // console.log(`!`, this.state.token)
      }
    } catch (e) {
      console.log(e)
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
    let poop = store.getState()
    console.log(`poop`, poop)
    // logout()
    // this.setState({
    //   nowPlaying: {
    //     name: 'unknown',
    //     image: 'unknown'
    //   },
    //   user: {
    //     name: '',
    //     email: ''
    //   }
    // })
  }

  getSpotifyUser = async () => {
    let access_token = store.getState()
    console.log(access_token)

    // await $.ajax({
    //   url: 'https://api.spotify.com/v1/me',
    //   type: 'GET',
    //   beforeSend: xhr => {
    //     xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
    //   },

    //   success: data => {
    //     this.setState({
    //       user: {
    //         name: data.display_name,
    //         image: data.email
    //       }
    //     })
    //   }
    // })
  }

  getNowPlaying = token => {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: data => {
        if (data) {
          this.setState({
            nowPlaying: {
              name: data.item.name,
              image: data.item.album.images[0].url
            }
          })
        }
      }
    })
  }

  render() {
    console.log(this.props)
    const { isAuth } = this.state

    if (localStorage['spotifyToken']) {
      console.log('update poop')
    }

    return (
      <>
        {/* <a href='http://localhost:8888/'> */}
        <button onClick={this.loginWithSpotify}>Login with Spotify</button>
        <button onClick={this.logout}>Logout</button>
        {/* </a> */}
        {isAuth ? (
          <>
            <div>Hello {this.state.user.name}</div>
            <div>You listening: {this.state.nowPlaying.name}</div>
            <div>
              <img
                src={this.state.nowPlaying.image}
                alt='album img'
                style={{ width: '200px' }}
              />
            </div>
            {/* <button onClick={this.logout}>Logout</button> */}
            {/* <button onClick={() => this.getNowPlaying(this.getHashParams())}>
              Check now playing
            </button> */}
          </>
        ) : (
          ''
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.reducer
})

export default connect(mapStateToProps, null)(PlaySong)
