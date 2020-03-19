import React, { Component } from 'react'
import PlaySong from './PlaySong'
import { connect } from 'react-redux'
import { setCurrentAuthUser } from '../../redux/actions/actions'
import { checkAuth } from '../api/setAuth'
import store from '../../redux/store/store'

class Session extends Component {
//   componentDidMount = async () => {
//     checkAuth()
//     let tokens = localStorage.getItem('spotifyToken')

//     // console.log(tokens)
//     if (tokens) {
//       const { setCurrentAuthUser } = this.props
//       setCurrentAuthUser(JSON.parse(tokens))

//       let states = store.getState()

//       if (states.reducer.user.isAuth) {
//         console.log(`redux states`, states)
//       }
//     }
//   }

  render() {
    return <PlaySong />
  }
}

const mapStateToProps = state => ({
  auth: state.reducer
})

export default connect(mapStateToProps, {})(Session)
