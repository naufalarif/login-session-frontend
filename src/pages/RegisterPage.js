import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

// Redux
import { connect } from 'react-redux'
import * as ACTIONS from '../Redux/action/userSignupAction'

// Component
import LoadingSpinner from '../components/LoadingSpinner'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confPassword: '',
    }
  }

  componentDidUpdate() {
    const { userSignupState } = this.props
    if (userSignupState.success) {
      this.props.history.push('/login')
      window.location.reload()
    }
  }

  handleNavigation = () => {
    this.props.history.push('/login')
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    const { username, email, password } = this.state
    let data = {
      username: username,
      email: email,
      password: password
    }
    this.props.fetchUserSignup(data)
  }

  render() {
    const { userSignupState } = this.props
    const { password, confPassword, email, username } = this.state
    
    const fetchButton = userSignupState.fetching 
      ? <LoadingSpinner /> 
      : <button className='btn-style mb-3' onClick={this.handleSubmit}>SIGN UP</button>
    const displayButton = password === confPassword && (!isEmpty(email) && !isEmpty(username) && !isEmpty(password))
      ? fetchButton
      : <button className='btn-disabled mb-3'>SIGN UP</button>
    const errorMessage = Array.isArray(userSignupState.error) 
      ? userSignupState.error.map(err => err.msg) 
      : userSignupState.error
    const displayError = !isEmpty(userSignupState.error) 
      ? <span className='text-danger'>{errorMessage.toString()}</span> 
      : null

    return (
      <div className='block'>
        <div className='frame'>
          <div className='container'>
            <h2 className='text-center mb-4 pb-4'>SIGN UP</h2>
            <div className=''>
              <div className='pb-3'>
                <span className='text-bold'>Username</span><br/>
                <input 
                  className='input-style'
                  id='username'
                  placeholder='Username'
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className='pb-3'>
                <span className='text-bold'>Email</span><br/>
                <input 
                  className='input-style'
                  id='email'
                  placeholder='Email'
                  type='email'
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
              <div className='pb-4'>
                <span className='text-bold'>Confirm Password</span><br/>
                <input 
                  className='input-style'
                  id='confPassword'
                  placeholder='Confirm password'
                  type='password'
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className='text-center'>
                <div className='pb-3'>
                  <span className='text-style'>Already have an account?</span>
                  <span className='text-link' onClick={this.handleNavigation}>Login here</span>
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
  userSignupState: state.userSignupState
})

const mapDispatchToProps = dispatch => ({
  fetchUserSignup: (data) => dispatch(ACTIONS.fetchUserSignup(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage))
