import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

// Redux
import { connect } from 'react-redux'
import * as ACTION from '../Redux/action/userLoginAction'

// Component
import LoadingSpinner from '../components/LoadingSpinner'

export class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidUpdate() {
    const { loginState } = this.props
    if (loginState.success) {
      localStorage.setItem('jwtToken', loginState.data.token)
      window.location.reload()
    }
  }

  handleNavigation = () => {
    this.props.history.push('/register');
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    const { email, password } = this.state
    let data = {
      email: email,
      password: password
    }
    this.props.fetchUserLogin(data)
  }

  render() {
    const { loginState } = this.props
    const { email, password } = this.state

    const fetchButton = loginState.fetching 
      ? <LoadingSpinner /> 
      : <button className='btn-style mb-3' onClick={this.handleSubmit}>LOGIN</button>
    const displayButton = !isEmpty(email) && !isEmpty(password)
      ? fetchButton
      : <button className='btn-disabled mb-3'>LOGIN</button>
    const errorMessage = Array.isArray(loginState.error) 
      ? loginState.error.map(err => err.msg) 
      : loginState.error
    const displayError = !isEmpty(loginState.error) 
      ? <span className='text-danger'>{errorMessage.toString()}</span> 
      : null
      
    if (localStorage.getItem('jwtToken')) {
      return <Redirect to='/' />
    } 
    return (
      <div className='block'>
        <div className='frame'>
          <div className='container'>
            <h2 className='text-center mb-4 pb-4'>LOGIN</h2>
            <div className=''>
              <div className='pb-3'>
                <span className='text-bold'>Email</span><br/>
                <input 
                  className='input-style'
                  id='email'
                  placeholder='Email'
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className='pb-3'>
                <span className='text-bold'>Password</span><br/>
                <input 
                  className='input-style'
                  id='password'
                  placeholder='Password'
                  type='password'
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className='text-center'>
                <div className='pb-3'>
                  <span className='text-style'>Doesn't have an account?</span>
                  <span className='text-link' onClick={this.handleNavigation}>Sign up here</span>
                </div>
                {displayButton}
                {displayError}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginState: state.userLoginState
})

const mapDispatchToProps = dispatch => ({
  fetchUserLogin: (data) => dispatch(ACTION.fetchUserLogin(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (LoginPage))
