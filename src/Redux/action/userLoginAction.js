import { loginUser } from "../../Api/api"

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

export const fetchUserLogin = (data) => {
  return dispatch => {
    dispatch(userLoginRequest())
    loginUser(data)
      .then(res => {
        if (res.errors) {
          dispatch(userLoginFailure(res.errors))
        } else {
          dispatch(userLoginSuccess(res))
        }
      })
      .catch(err => {
        dispatch(userLoginFailure(err))
      })
  }
}

export const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST
  }
}

export const userLoginSuccess = (data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data
  }
}

export const userLoginFailure = (err) => {
  return {
    type: USER_LOGIN_FAILURE,
    error: err
  }
}