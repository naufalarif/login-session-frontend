import { signupUser } from "../../Api/api"

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE'

export const fetchUserSignup = (data) => {
  return dispatch => {
    dispatch(userSignupRequest())
    signupUser(data)
      .then(res => {
        if (res.errors) {
          dispatch(userSignupFailure(res.errors))
        } else {
          dispatch(userSignupSuccess(res))
        }
      })
      .catch(err => {
        console.log('error: ', err)
        dispatch(userSignupFailure(err))
      })
  }
}

export const userSignupRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST
  }
}

export const userSignupSuccess = (data) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: data
  }
}

export const userSignupFailure = (err) => {
  return {
    type: USER_SIGNUP_FAILURE,
    error: err
  }
}