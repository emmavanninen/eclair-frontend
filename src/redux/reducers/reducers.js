import { SET_SPOTIFY_TOKEN, LOG_OUT } from '../constants/constants'

const initialState = {
  user: {
    isAuth: null,
    token: null
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTIFY_TOKEN:
      return {
        ...state,
        user: {
          isAuth: true,
          token: action.token
        }
      }
    case LOG_OUT:
      return {
        ...state,
        user: {
          isAuth: false,
          token: null
        }
      }
    default:
      return state
  }
}
