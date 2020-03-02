import React, { Component } from 'react'

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()

        if (!this.state.username || !this.state.password) {
            console.log(`Username or password missing`)
            return
        }

        if (this.state.password !== this.state.confirmPassword) {
            console.log(`Passwords don't match`)
            return
        }

        try {
            //   let res = await login(this.state)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let form = (
            <div className='navTabContent'>
                <form className='navTabForm login' onSubmit={this.handleSubmit}>
                    <h5>Login</h5>
                    <label>
                        <h6>Username</h6>
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                    </label>
                    <label>
                        <h6>Password</h6>
                        <input
                            type='password'
                            name='password'
                            autoComplete='password'
                            placeholder='Password'
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </label>
                    <br />
                    <input className='navButton' type='submit' value='Login' />
                </form>
            </div>
        )
        return form
    }
}

export default LoginForm
