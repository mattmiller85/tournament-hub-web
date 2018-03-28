//@ts-check

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
})