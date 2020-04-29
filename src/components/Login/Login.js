import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentAuthUser } from '../../redux/actions/actions'
import store from '../../redux/store/store'

class Login extends Component {
  componentDidMount = async () => {
    this.login()
  }

  login = async () => {
    const { setCurrentAuthUser } = this.props
    const tokens = await this.getHashParams()
    setCurrentAuthUser(tokens)

    let states = store.getState()

    if (states.reducer.userInfo.isAuth) {
      console.log(`redux states`, states)
      localStorage.setItem('spotifyToken', JSON.stringify(tokens))
    }
    window.opener.location.href = 'http://ec2-3-83-182-99.compute-1.amazonaws.com/' || 'http://localhost:3000'
    window.close()
  }

  getHashParams = async () => {
    const hashParams = {}
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)

    while ((e = r.exec(q))) {
      hashParams[e[1]] = await decodeURIComponent(e[2])
    }
    try {
      return hashParams
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return <div>Login in...</div>
  }
}

const mapStateToProps = (state) => ({
  auth: state.reducer,
})

export default connect(mapStateToProps, { setCurrentAuthUser })(Login)
