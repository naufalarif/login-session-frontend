import { getUserProfile } from "../../Api/api"

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'

export const fetchUserProfile = (token) => {
  return dispatch => {
    dispatch(getUserRequest())
    getUserProfile(token)
      .then(res => {
        dispatch(getUserSuccess(res))
      })
      .catch(err => {
        dispatch(getUserFailure(err))
      })
  }
}

export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST
  }
}

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  }
}

export const getUserFailure = (err) => {
  return {
    type: GET_USER_FAILURE,
    error: err
  }
}