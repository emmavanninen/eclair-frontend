import React, { Component } from 'react'

class RegisterForm extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()

        // if (this.state.username.length > 15) {
        //   console.log('Username max 10 characters')
        //   return
        // }

        if (this.state.password !== this.state.confirmPassword) {
            console.log(`Passwords don't match`)
            return
        }

        try {
            //   let res = await register(this.state)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let form = (
            <div className='navTabContent'>
                <form className='navTabForm register' onSubmit={this.handleSubmit}>
                    <h5>Register</h5>
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
                        <h6>Email</h6>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            onChange={this.handleChange}
                            value={this.state.email}
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
                    <label>
                        <h6>Confirm password</h6>
                        <input
                            type='password'
                            name='confirmPassword'
                            autoComplete='confirm-password'
                            onChange={this.handleChange}
                            placeholder='Confirm password'
                            value={this.state.confirmPassword}
                        />
                    </label>
                    <br />
                    <input className='navButton' type='submit' value='Register' />
                </form>
            </div>
        )
        return form
    }
}

export default RegisterForm
