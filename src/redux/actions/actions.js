import { SET_SPOTIFY_TOKEN, LOG_OUT } from '../constants/constants'

//? redux action returns an object
export const setCurrentAuthUser = token => async dispatch => {
  dispatch({
    //? type = action's name
    type: SET_SPOTIFY_TOKEN,
    token: token
  })
}

export const getToken = () => dispatch => {
  console.log('-----')
}

export const logout = () => dispatch => {
  localStorage.removeItem('spotifyToken')
  //   setAxiosToken(false)
  dispatch({
    type: LOG_OUT
  })
}

// export const clearCurrentAuth = () => {
//   return {
//     type: LOG_OUT
//   }
// }
