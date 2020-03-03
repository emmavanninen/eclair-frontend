import React, { Component } from 'react'
import * as $ from 'jquery'
import Spotify from 'spotify-web-api-js'

export default class PlaySong extends Component {
  state = {
    isAuth: false,
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
    this.getSpotifyUser(this.getHashParams())
  }

  getHashParams() {
    const hashParams = {}
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    console.log(`hashParams`, hashParams)

    if (window.location.hash) {
      this.setState({
        isAuth: true
      })
      return hashParams
    }
  }

  getSpotifyUser = async(token) => {
    await $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: data => {
        // console.log(`data`, data.device.id)

        this.setState({
          user: {
            name: data.display_name,
            image: data.email
          }
        })
      }
    })
    console.log(`user data`, this.state.user)
  }

  getNowPlaying = token => {
    console.log(`token`, token)

    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: data => {
        console.log(`data`, data)
        // console.log(`data`, data.device.id)

        this.setState({
          nowPlaying: {
            name: data.item.name,
            image: data.item.album.images[0].url
          }
        })
      }
    })
  }

  render() {
    return (
      <>
        <div>Now playing: {this.state.nowPlaying.name}</div>
        <div>
          <img
            src={this.state.nowPlaying.image}
            alt='album img'
            style={{ width: '200px' }}
          />
        </div>
        <button onClick={() => this.getNowPlaying(this.getHashParams())}>
          Check now playing
        </button>
      </>
    )
  }
}
