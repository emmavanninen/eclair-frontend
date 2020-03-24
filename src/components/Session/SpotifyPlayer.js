import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as $ from 'jquery'
import store from '../../redux/store/store'
import { setCurrentAuthUser } from '../../redux/actions/actions'
import { checkAuth, logout } from '../api/setAuth'

class SpotifyPlayer extends Component {
  state = {
    isPlaying: false,
    token: null,
    isAuth: this.props.isAuth,
    nowPlaying: {
      name: null,
      image: null
    },
    user: this.props.user,
    activeDevice: null,
    playlists: null,
    tracks: null,
    activePlaylist: null
  }

  componentDidMount = async () => {
    console.log(this.props)

    if (this.props.isAuth) {
      let states = store.getState()
      console.log(`states`, states)

      await this.setState({
        token: states.reducer.userInfo.token,
        user: {
          name: states.reducer.userInfo.user.name,
          email: states.reducer.userInfo.user.email
        }
      })
      try {
        this.getUserPlayLists(this.state.token)
        this.getNowPlaying(this.state.token)
      } catch (e) {
        console.log(e)
      }
    }
  }

  getUserPlayLists = async token => {
    await $.ajax({
      url: 'https://api.spotify.com/v1/me/player/devices',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: data => {
        //TODO: if no devices

        this.setState({
          activeDevice: data.devices[0].id
        })
      }
    })
  }

  getPlaylists = async token => {
    console.log(`?`, this.state.user)

    await $.ajax({
      url: `https://api.spotify.com/v1/users/${this.state.user.name}/playlists`,
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },
      success: data => {
        let playlists = data.items.map(playlist => {
          return (
            <li
              key={playlist.id}
              onClick={() => {
                this.handlePlaylistOnClick(playlist.name, playlist.id)
              }}
            >
              {playlist.name}
            </li>
          )
        })
        this.setState({
          playlists: playlists
        })
      }
    })
  }

  handlePlaylistOnClick = (playlistName, playlistID) => {
    if (this.state.activePlaylist === playlistName) {
      this.setState({
        tracks: null,
        activePlaylist: null
      })
    } else {
      this.getPlaylistTracks(playlistName, playlistID, this.state.token)
    }
  }

  getPlaylistTracks = async (playlistName, playlistID, token) => {
    await $.ajax({
      url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },
      success: data => {
        let playlistTracks = data.items.map(track => {
          return (
            <li
              key={track.track.id}
              uri={track.track.uri}
              onClick={() => {
                this.playNewSong(track.track.uri)
              }}
            >
              {track.track.name}
              <br />
              By: {track.track.artists[0].name}
            </li>
          )
        })
        this.setState({
          tracks: playlistTracks,
          activePlaylist: playlistName
        })
      }
    })
  }

  getNowPlaying = () => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/currently-playing',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' + this.state.token.access_token
        )
      },

      success: data => {
        if (data) {
          this.setState({
            isPlaying: data.is_playing,
            nowPlaying: {
              name: data.item.name,
              image: data.item.album.images[0].url
            }
          })
        }
      }
    })
  }

  playNewSong = uri => {
    $.ajax({
      url: `https://api.spotify.com/v1/me/player/play?device_id=${this.state.activeDevice}`,
      data: JSON.stringify({ uris: [uri] }),
      type: 'PUT',
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' + this.state.token.access_token
        )
      },

      success: data => {
        this.getNowPlaying()
      }
    })
  }

  playSong = token => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/play',
      type: 'PUT',
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' + this.state.token.access_token
        )
      },

      success: data => {
        this.getNowPlaying()
      }
    })
  }
  pauseSong = () => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/pause',
      type: 'PUT',
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' + this.state.token.access_token
        )
      },

      success: data => {
        this.getNowPlaying()
      }
    })
  }

  previousSong = () => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/previous',
      type: 'POST',
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' + this.state.token.access_token
        )
      },

      success: () => {
        this.setState({
          playButton: false
        })
        this.getNowPlaying()
      }
    })
  }

  nextSong = () => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/next',
      type: 'POST',
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'Authorization',
          'Bearer ' + this.state.token.access_token
        )
      },

      success: () => {
        this.setState({
          playButton: false
        })
        this.getNowPlaying()
      }
    })
  }

  render() {
    const { isAuth } = this.state

    return (
      <>
        {/* <div>Hello {this.state.user.name}</div> */}
        <button
          onClick={() =>
            this.state.playlists
              ? this.setState({
                  playlists: null
                })
              : this.getPlaylists(this.state.token)
          }
        >
          Playlists
        </button>
        {/* <button onClick={this.logout}>Logout</button> */}
        {this.state.nowPlaying.name ? (
          <>
            <div>You listening: {this.state.nowPlaying.name}</div>
            <div>
              <img
                src={this.state.nowPlaying.image}
                alt='album img'
                style={{ width: '200px' }}
              />
            </div>
            {this.state.isPlaying ? (
              <button onClick={() => this.pauseSong()}>Pause</button>
            ) : (
              <button onClick={() => this.playSong()}>Play</button>
            )}

            <button onClick={() => this.previousSong()}>Previous</button>
            <button onClick={() => this.nextSong()}>Next</button>
          </>
        ) : (
          ''
        )}
        {this.state.playlists ? (
          <div>
            Your playlists:
            <ul>{this.state.playlists}</ul>
            {this.state.tracks ? (
              <ul>
                {this.state.tracks}
                <button>ADD</button>
              </ul>
            ) : (
              ''
            )}
          </div>
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

export default connect(mapStateToProps, { setCurrentAuthUser })(SpotifyPlayer)
