import { SET_SPOTIFY_TOKEN, LOG_OUT, TRACK_URIS } from '../constants/constants'

//? redux action returns an object
export const setCurrentAuthUser = (token, user) => async dispatch => {
  dispatch({
    //? type = action's name
    type: SET_SPOTIFY_TOKEN,
    token: token,
    user: user
  })
}

export const logout = () => dispatch => {
  localStorage.removeItem('spotifyToken')
  //   setAxiosToken(false)
  dispatch({
    type: LOG_OUT
  })
}
export const setTrackUris = uris => dispatch => {
  dispatch({
    type: TRACK_URIS,
    uris: uris
  })
}
