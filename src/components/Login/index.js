import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import styled from 'styled-components'
import ContextLanguage from '../../context/ContextLanguage'
import './index.css'

export const LoginButton = styled.button`
 padding: 10px 16px;
  background-color: #3b82f6;
  color: #ffffff;
  margin-bottom: 40px;
  font-family: Roboto;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
}


`

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    showErrorMsg: false,
    passwordtype: true,
  }

  successfullSubmit = token => {
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({error: errorMsg, showErrorMsg: true})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successfullSubmit(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  getUserInputContainer = () => (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark} = value
        const addStyle = isDark ? 'add-style' : null
        const labelStyle = isDark ? 'label-style' : null
        const {username} = this.state
        return (
          <div className={`username-container ${addStyle}`}>
            <label className={`label ${labelStyle}`} htmlFor="username">
              USERNAME
            </label>
            <input
              className={`input ${addStyle}`}
              type="text"
              placeholder="Username"
              onChange={this.getUsername}
              id="username"
              value={username}
            />
          </div>
        )
      }}
    </ContextLanguage.Consumer>
  )

  getPasswordInputContainer = () => (
    <ContextLanguage.Consumer>
      {value => {
        const {isDark} = value
        const addStyle = isDark ? 'add-style' : null
        const labelStyle = isDark ? 'label-style' : null
        const {password} = this.state
        const {passwordtype} = this.state
        const finalType = passwordtype ? 'password' : 'text'

        return (
          <div className={`password-container ${addStyle}`}>
            <label className={`label ${labelStyle}`} htmlFor="password">
              PASSWORD
            </label>
            <input
              type={finalType}
              className={`input ${addStyle}`}
              placeholder="Password"
              onChange={this.getPassword}
              id="password"
              value={password}
            />
          </div>
        )
      }}
    </ContextLanguage.Consumer>
  )

  showPassword = () => {
    this.setState(prevState => ({passwordtype: !prevState.passwordtype}))
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ContextLanguage.Consumer>
        {value => {
          const {isDark} = value
          const {error, showErrorMsg} = this.state
          const message = showErrorMsg ? error : null
          const appStyle = isDark ? 'app-style' : null
          const cardStyle = isDark ? 'card-style' : null
          const showpasswordlabelStyle = isDark ? 'change-color' : null
          const logoImage = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <div className={`login-page-container ${appStyle}`}>
              <div className={`login-card-container ${cardStyle}`}>
                <img
                  src={logoImage}
                  className="login-logo"
                  alt="website logo"
                />
                <form className="form-container" onSubmit={this.getUserDetails}>
                  {this.getUserInputContainer()}
                  {this.getPasswordInputContainer()}
                  <p className="error-msg">{message}</p>
                  <div className="show-password-container">
                    <input
                      className="showpassword-checkbox"
                      type="checkbox"
                      onChange={this.showPassword}
                      id="showpassword"
                    />
                    <label
                      htmlFor="showpassword"
                      className={`show-password-label ${showpasswordlabelStyle}`}
                    >
                      Show Password
                    </label>
                  </div>
                  <LoginButton type="submit">Login</LoginButton>
                </form>
              </div>
            </div>
          )
        }}
      </ContextLanguage.Consumer>
    )
  }
}

export default Login
