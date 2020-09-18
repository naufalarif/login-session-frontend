import * as ACTION from '../action/userUpdateAction'

const INITIAL_STATE = {
  data: {},
  fetching: false,
  success: false,
  error: null
}

export default function userUpdateReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION.UPDATE_USER_REQUEST:
      return {
        ...state,
        fetching: true,
        success: false,
        error: false
      }
    case ACTION.UPDATE_USER_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        data: action.payload,
        error: false
      }
    case ACTION.UPDATE_USER_FAILURE:
      return {
        ...state,
        fetching: false,
        success: false,
        error: action.error
      }
    default: return state
  }
}