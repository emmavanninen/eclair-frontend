import { SET_SPOTIFY_TOKEN, LOG_OUT } from '../constants/constants'

//? redux action returns an object
export const setCurrentAuthUser = token => async dispatch => {
  console.log(`token`, token)
  console.log(`window.location`, window.location)

  dispatch({
    //? type = action's name
    type: SET_SPOTIFY_TOKEN,
    token: token
  })
}

export const getToken = () => dispatch => {
  console.log('-----')
}
// export const logout = () => dispatch => {
//   localStorage.removeItem('spotifyToken')
//   //   setAxiosToken(false)
//   dispatch(setCurrentAuthUser({}))
// }

// export const clearCurrentAuth = () => {
//   return {
//     type: LOG_OUT
//   }
// }
