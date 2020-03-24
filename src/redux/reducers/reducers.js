import { SET_SPOTIFY_TOKEN, LOG_OUT, TRACK_URIS } from '../constants/constants'

const initialState = {
  userInfo: {
    isAuth: null,
    token: null,
    user: null
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTIFY_TOKEN:
      return {
        ...state,
        userInfo: {
          isAuth: true,
          token: action.token,
          user: action.user
        }
      }
    case LOG_OUT:
      return {
        ...state,
        userInfo: {
          isAuth: false,
          token: null
        }
      }
    case TRACK_URIS:
      return {
        ...state,
        uris: action.uris
      }
    default:
      return state
  }
}
