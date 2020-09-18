import { updateUserProfile } from "../../Api/api"

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

export const fetchUserUpdate = (data) => {
  return dispatch => {
    dispatch(userUpdateRequest())
    updateUserProfile(data)
      .then(res => {
        if (res.errors) {
          dispatch(userUpdateFailure(res.errors))
        } else {
          dispatch(userUpdateSuccess(res))
        }
      })
      .catch(err => {
        console.log('error: ', err)
        dispatch(userUpdateFailure(err))
      })
      console.log('redux: ', data)
  }
}

export const userUpdateRequest = () => {
  return {
    type: UPDATE_USER_REQUEST
  }
}

export const userUpdateSuccess = (data) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data
  }
}

export const userUpdateFailure = (err) => {
  return {
    type: UPDATE_USER_FAILURE,
    error: err
  }
}