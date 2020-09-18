import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

// Redux
import { connect } from 'react-redux'
import * as ACTION_GET_USER from '../Redux/action/userProfileAction'
import * as ACTION_UPDATE_USER from '../Redux/action/userUpdateAction'

// Component
import LoadingSpinner from '../components/LoadingSpinner'

class UpdatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem('jwtToken')
    this.props.fetchUser(jwtToken)
  }

  componentDidUpdate() {
    const { updateState } = this.props
    if (updateState.success) {
      this.props.history.push('/')
      window.location.reload()
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    const { username, email, password } = this.state
    const jwtToken = localStorage.getItem('jwtToken')
    let data = {
      token: jwtToken
    }

    if (!isEmpty(username)) {
      data = { 
        ...data,
        username: username 
      }
    }
    if (!isEmpty(email)) {
      data = {
        ...data,
        email: email 
      }
    }
    if (!isEmpty(password)) {
      data = {
        ...data,
        password: password 
      }
    }

    this.props.fetchUpdate(data)
  }

  handleCancel = () => {
    this.props.history.goBack()
  }
  
  render() {
    const { userState, updateState } = this.props
    const { username, email, password } = this.state
    const payload = !isEmpty(userState) ? userState.data : {}
    const updatePayload = !isEmpty(updateState) ? userState : {}

    const btnFetch = updatePayload.fetching 
      ? <LoadingSpinner />
      : <button className='btn-style' onClick={this.handleSubmit}>Save</button>
    const btnSave = !isEmpty(email) || !isEmpty(username) || !isEmpty(password)
      ? btnFetch
      : <button className='btn-disabled'>Save</button>

    return (
      <div className='block'>
        <div className='frame'>
          <div className='container'>
            <h2 className='mb-4 pb-4'>Edit Profile</h2>
            <div className=''>
              <div className='pb-3'>
                <span>Email</span>
                <input 
                  className='input-style'
                  id='email'
                  placeholder={payload.email}
                  type='email'
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className='pb-3'>
                <span>Username</span>
                <input 
                  className='input-style'
                  id='username'
                  placeholder={payload.username}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className='pb-4 mb-4'>
                <span>New password</span>
                <input 
                  className='input-style'
                  id='password'
                  placeholder='At least 5 characters'
                  type='password'
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>
            <div className='text-center'>
              <div className='pb-3 pt-3'>
                <button className='btn-secondary' onClick={this.handleCancel}>Cancel</button>
              </div>
              <div className='pb-4'>
                {btnSave}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userState: state.userProfileState,
  updateState: state.userUpdateState,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (token) => dispatch(ACTION_GET_USER.fetchUserProfile(token)),
  fetchUpdate: (data) => dispatch(ACTION_UPDATE_USER.fetchUserUpdate(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (UpdatePage))
