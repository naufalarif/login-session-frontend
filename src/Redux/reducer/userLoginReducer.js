import * as ACTION from '../action/userLoginAction'

const INITIAL_STATE = {
  data: {},
  fetching: false,
  success: false,
  error: null
}

export default function loginUserReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION.USER_LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
        success: false,
        error: false
      }
    case ACTION.USER_LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        data: action.payload,
        error: false
      }
    case ACTION.USER_LOGIN_FAILURE:
      return {
        ...state,
        fetching: false,
        success: false,
        error: action.error
      }
    default: return state
  }
}