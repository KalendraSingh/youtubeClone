import {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import {
  LoginContainer,
  LoginCard,
  LogoContainer,
  LogoImage,
  FormContainer,
  UsernameContainer,
  PasswordContainer,
  Label,
  Input,
  CheckboxContainer,
  InputCheckBox,
  LabelShowPassword,
  SubmitButton,
  ErrorMsg,
  LoginContainerDark,
  LoginCardDark,
  LogoContainerDark,
  UsernameContainerDark,
  PasswordContainerDark,
  LabelDark,
  InputDark,
  CheckboxContainerDark,
  InputCheckBoxDark,
  LabelShowPasswordDark,
} from './styledComponents'

class Register extends Component {
  state = {
    showSubmitError: false,
    username: '',
    email: '',
    password: '',
    errorMsg: '',
    inputType: 'password',
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
      errorMsg: '',
      showSubmitError: false,
    })
  }

  onChangeEmail = event => {
    this.setState({
      email: event.target.value,
      errorMsg: '',
      showSubmitError: false,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
      errorMsg: '',
      showSubmitError: false,
    })
  }

  onChangeCheckBox = event => {
    if (event.target.checked === true) {
      this.setState({
        inputType: 'text',
      })
    } else {
      this.setState({
        inputType: 'password',
      })
    }
  }

  //   onSubmitSuccess = jwtToken => {
  //     Cookies.set('jwt_token', jwtToken, {expires: 30})
  //     const {history} = this.props
  //     history.replace('/login')
  //   }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  Onsubmit = async event => {
    event.preventDefault()
    const {username, email, password} = this.state
    const userDetails = {
      username,
      email,
      password,
    }
    const url = 'https://users-7c43.onrender.com/users'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      history.replace('/login')
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  loginLightBg = () => {
    const {
      showSubmitError,
      username,
      password,
      errorMsg,
      email,
      inputType,
    } = this.state
    return (
      <LoginContainer>
        <LoginCard>
          <LogoContainer>
            <LogoImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </LogoContainer>
          <FormContainer onSubmit={this.Onsubmit}>
            <UsernameContainer>
              <Label htmlFor="USERNAME">USERNAME</Label>
              <Input
                id="USERNAME"
                type="text"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </UsernameContainer>
            <UsernameContainer>
              <Label htmlFor="EMAIL">EMAIL</Label>
              <Input
                id="EMAIL"
                type="text"
                placeholder="email"
                value={email}
                onChange={this.onChangeEmail}
              />
            </UsernameContainer>
            <PasswordContainer>
              <Label htmlFor="PASSWORD">PASSWORD</Label>
              <Input
                id="PASSWORD"
                type={inputType}
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </PasswordContainer>
            <CheckboxContainer>
              <InputCheckBox
                type="checkbox"
                id="show-password"
                onChange={this.onChangeCheckBox}
              />
              <LabelShowPassword htmlFor="show-password">
                Show Password
              </LabelShowPassword>
            </CheckboxContainer>
            <SubmitButton type="submit">Register</SubmitButton>
            <p style={{textAlign: 'center'}}>
              <Link to="/login" style={{textDecoration: 'none'}}>
                Already have account?
              </Link>
            </p>
          </FormContainer>
          {showSubmitError && <ErrorMsg>*{errorMsg}</ErrorMsg>}
        </LoginCard>
      </LoginContainer>
    )
  }

  loginDarkBg = () => {
    const {
      showSubmitError,
      username,
      password,
      errorMsg,
      email,
      inputType,
    } = this.state
    return (
      <LoginContainerDark>
        <LoginCardDark>
          <LogoContainerDark>
            <LogoImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="logo"
            />
          </LogoContainerDark>
          <FormContainer onSubmit={this.Onsubmit}>
            <UsernameContainerDark>
              <LabelDark htmlFor="USERNAME">USERNAME</LabelDark>
              <InputDark
                id="USERNAME"
                value={username}
                type="text"
                placeholder="Username"
                onChange={this.onChangeUserName}
              />
            </UsernameContainerDark>
            <UsernameContainerDark>
              <LabelDark htmlFor="EMAIL">EMAIL</LabelDark>
              <InputDark
                id="EMAIL"
                value={email}
                type="text"
                placeholder="email"
                onChange={this.onChangeEmail}
              />
            </UsernameContainerDark>
            <PasswordContainerDark>
              <LabelDark htmlFor="PASSWORD">PASSWORD</LabelDark>
              <InputDark
                id="PASSWORD"
                value={password}
                type={inputType}
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </PasswordContainerDark>
            <CheckboxContainerDark>
              <InputCheckBoxDark
                type="checkbox"
                id="show-password"
                onChange={this.onChangeCheckBox}
              />
              <LabelShowPasswordDark htmlFor="show-password">
                Show Password
              </LabelShowPasswordDark>
            </CheckboxContainerDark>
            <SubmitButton type="submit">Register</SubmitButton>
            <p style={{textAlign: 'center'}}>
              <Link to="/login" style={{textDecoration: 'none'}}>
                Already have account?
              </Link>
            </p>
          </FormContainer>
          {showSubmitError && <ErrorMsg>*{errorMsg}</ErrorMsg>}
        </LoginCardDark>
      </LoginContainerDark>
    )
  }

  renderLoginPage = () => (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDark} = value
        return isDark ? this.loginDarkBg() : this.loginLightBg()
      }}
    </ThemeAndVideoContext.Consumer>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginPage()
  }
}
export default Register
