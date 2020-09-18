import { combineReducers } from 'redux'

import UserSignupReducer from '../reducer/userSignupReducer'
import UserLoginReducer from '../reducer/userLoginReducer'
import UserProfileReducer from '../reducer/userProfileReducer'
import UserDeleteReducer from '../reducer/userDeleteReducer'
import UserUpdateReducer from '../reducer/userUpdateReducer'

const rootReducer = combineReducers({
  userSignupState: UserSignupReducer,
  userLoginState: UserLoginReducer,
  userProfileState: UserProfileReducer,
  userDeleteState: UserDeleteReducer,
  userUpdateState: UserUpdateReducer,
})

export default rootReducer