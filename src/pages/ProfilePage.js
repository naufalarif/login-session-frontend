import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

// Redux
import { connect } from 'react-redux'
import * as ACTION_GET_USER from '../Redux/action/userProfileAction'
import * as ACTION_DELETE_USER from '../Redux/action/userDeleteAction'

class ProfilePage extends Component {

  componentDidMount() {
    const jwtToken = localStorage.getItem('jwtToken')
    this.props.fetchUser(jwtToken)
  }

  componentDidUpdate() {
    const { userDeleteState } = this.props
    if (userDeleteState.success) {
      localStorage.removeItem('jwtToken')
      window.location.reload()
    }
  }

  handleDeleteAccount = (token) => {
    console.log(token)
    this.props.deleteUser(token)
  }

  handleSignout = () => {
    localStorage.removeItem('jwtToken')
    window.location.reload()
  }

  handleNavigation = () => {
    this.props.history.push('/update')
  }
  
  render() {
    const { userState, userDeleteState } = this.props

    const payload = !isEmpty(userState) ? userState.data : {}
    const jwtToken = localStorage.getItem('jwtToken')
    const getDate = new Date(payload.createdAt)
    const date = getDate.toString().slice(0, 15)

    const fetchBtnDel = userDeleteState.fetching 
      ? <span>Delete</span> 
      : <span className='text-danger cursor-pointer' onClick={() => this.handleDeleteAccount(jwtToken)}>Delete</span>

    if (!jwtToken) {
      return <Redirect to='/login' />
    }
    return (
      <div className='block'>
        <div className='frame'>
          <div className='container'>
            <h2 className='mb-4 pb-4'>Welcome, {payload.username}</h2>
            <div className=''>
              <div className='pb-3'>
                <span>Email: </span><span className='text-bold'>{payload.email}</span>
              </div>
              <div className='pb-3'>
                <span>Username: </span><span className='text-bold'>{payload.username}</span>
              </div>
              <div className='pb-3'>
                <span>Created at: </span>
                <span className='text-bold'>{date.toString()}</span>
              </div>
            </div>
            <div className='text-center'>
              <div className='pb-3'>
                <button className='btn-style' onClick={this.handleNavigation}>Edit</button>
              </div>
              <div className='pb-4'>
                {fetchBtnDel}
              </div>
              <div className='pt-4 mt-4'>
                <button className='btn-style' onClick={this.handleSignout}>LOGOUT</button>
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
  userDeleteState: state.userDeleteState,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (token) => dispatch(ACTION_GET_USER.fetchUserProfile(token)),
  deleteUser: (token) => dispatch(ACTION_DELETE_USER.fetchUserDelete(token)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ProfilePage))
