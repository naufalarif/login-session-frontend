import * as ACTION from '../action/userProfileAction'

const INITIAL_STATE = {
  data: {},
  fetching: false,
  success: false,
  error: null
}

export default function userProfileReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION.GET_USER_REQUEST:
      return {
        ...state,
        fetching: true,
        success: false,
        error: false
      }
    case ACTION.GET_USER_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        data: action.payload,
        error: false
      }
    case ACTION.GET_USER_FAILURE:
      return {
        ...state,
        fetching: false,
        success: false,
        error: action.error
      }
    default: return state
  }
}