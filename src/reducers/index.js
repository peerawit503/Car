import { combineReducers } from 'redux'
import counterReducer from './counters'
import userReducer from './user'

export default combineReducers({
  counters: counterReducer,
  user: userReducer
})