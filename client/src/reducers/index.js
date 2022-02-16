import { combineReducers } from "redux";
import userReducer from './user.reducer'
import usersReducer from './users.reducers'

export default combineReducers({
    userReducer,
    usersReducer,
})