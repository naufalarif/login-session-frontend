import * as ACTIONS from '../action/userSignupAction'

const INITIAL_STATE = {
  data: {},
  fetching: false,
  success: false,
  error: null,
}

export default function userSignupReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTIONS.USER_SIGNUP_REQUEST: 
      return {
        ...state,
        fetching: true,
        success: false,
        error: false
      }
    case ACTIONS.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.payload,
        success: true,
        error: false
      }
    case ACTIONS.USER_SIGNUP_FAILURE:
      return {
        ...state,
        fetching: false,
        success: false,
        error: action.error
      }
    default: return state
  }
}