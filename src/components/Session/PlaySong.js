import React, { Component } from 'react'
import * as $ from 'jquery'
import Spotify from 'spotify-web-api-js'

export default class PlaySong extends Component {
  state = {
    loggedIn: false,
    nowPlaying: {
      name: 'unknown',
      image: 'unknown'
    }
  }

//   componentDidMount = async () => {
//     await this.getHashParams()
//   }

  getHashParams() {
    const hashParams = {}
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.search.substring(1)
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    console.log(hashParams.code)

    return hashParams.code
  }

  getNowPlaying = async token => {
    console.log(`token`, token)

    // Make a call using the token
    let success = $.ajax({
      url: 'https://api.spotify.com/v1/me/player',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' +
            'BQBkM-GIvi04_lzAhlicrVIV1cwOtmLv4Xd96dRDwVqiNaRL3N7LV-ncHeUuW756KZwgIggwzzR21lZ0hPtvxkFHNs571Gl9ciiWw2HAjuQhMoDj38p5v2msFFV2JZeVYbboriEKXQI03bxByM1oR6VqG3aZ_CVx&refresh_token=AQAMHrLCDMvSczSPTUrcRvuponMoronD9RFQVxtG7xoU5VnsDunVcqqKp4eSx1wgX5Bw3d3s9PKoK7TlVSil1P8k3RTIvf0y64ohCYizOYWk-s1R_CrZ_QCG64GpsIij9Lg'
        )
      },

      success: data => {
        this.setState({
          data: data.item,
          //   item: data.item,
          nowPlaying: {
            name: data.item.name,
            image: data.item.album.images[0].url
          }
        })
      }
    })
    console.log(this.state.data)
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
