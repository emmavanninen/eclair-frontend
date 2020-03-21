import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as $ from 'jquery'
import store from '../../redux/store/store'
import { setCurrentAuthUser } from '../../redux/actions/actions'
import { checkAuth } from '../api/setAuth'

class PlaySong extends Component {
  state = {
    playButton: false,
    token: null,
    isAuth: false,
    nowPlaying: {
      name: null,
      image: null
    },
    user: {
      name: '',
      email: ''
    },
    playlists: null,
    tracks: null,
    activePlaylist: null
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
          isAuth: true,
          token: states.reducer.user.token
        })
        this.getSpotifyUser(states.reducer.user.token)
        this.getNowPlaying(states.reducer.user.token)
      }
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
    // let poop = store.getState()
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

  getSpotifyUser = async token => {
    await $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: data => {
        this.setState({
          user: {
            name: data.display_name,
            image: data.email
          }
        })
      }
    })
  }

  getPlaylists = async token => {
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
            <li>
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

  getNowPlaying = token => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/currently-playing',
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

  playSong = token => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/play',
      type: 'PUT',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: data => {
        this.setState({
          playButton: false
        })
      }
    })
  }
  pauseSong = token => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/pause',
      type: 'PUT',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: data => {
        this.setState({
          playButton: true
        })
      }
    })
  }

  previousSong = token => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/previous',
      type: 'POST',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: () => {
        this.setState({
          playButton: false
        })
        this.getNowPlaying(this.state.token)
      }
    })
  }

  nextSong = token => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/next',
      type: 'POST',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token)
      },

      success: () => {
        this.setState({
          playButton: false
        })
        this.getNowPlaying(this.state.token)
      }
    })
  }

  render() {
    const { isAuth } = this.state

    return (
      <>
        <button onClick={this.loginWithSpotify}>Login with Spotify</button>
        {isAuth ? (
          <>
            <div>Hello {this.state.user.name}</div>
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
                <button onClick={this.logout}>Logout</button>
                {this.state.playButton ? (
                  <button onClick={() => this.playSong(this.state.token)}>
                    Play
                  </button>
                ) : (
                  <button onClick={() => this.pauseSong(this.state.token)}>
                    Pause
                  </button>
                )}

                <button onClick={() => this.previousSong(this.state.token)}>
                  Previous
                </button>
                <button onClick={() => this.nextSong(this.state.token)}>
                  Next
                </button>
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
              </>
            ) : (
              ''
            )}
            {this.state.playlists ? (
              <div>
                Your playlists:
                <ul>{this.state.playlists}</ul>
                {this.state.tracks ? <ul>{this.state.tracks}</ul> : ''}
              </div>
            ) : (
              ''
            )}
          </>
        ) : (
          <div>No song currently playing</div>
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.reducer
})

export default connect(mapStateToProps, { setCurrentAuthUser })(PlaySong)
