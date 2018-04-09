//@ts-check

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import tournamentReducer from './tournamentReducer'

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  tournament: tournamentReducer,
})