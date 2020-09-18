import { deleteUser } from "../../Api/api"

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'

export const fetchUserDelete = (data) => {
  return dispatch => {
    dispatch(userDeleteRequest())
    deleteUser(data)
      .then(res => {
        if (res.errors) {
          console.log('err: ', res)
          dispatch(userDeleteFailure(res.errors))
        } else {
          console.log('res: ', res)
          dispatch(userDeleteSuccess(res))
        }
      })
      .catch(err => {
        console.log('error: ', err)
        dispatch(userDeleteFailure(err))
      })
  }
}

export const userDeleteRequest = () => {
  return {
    type: DELETE_USER_REQUEST
  }
}

export const userDeleteSuccess = (data) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: data
  }
}

export const userDeleteFailure = (err) => {
  return {
    type: DELETE_USER_FAILURE,
    error: err
  }
}