import { combineReducers } from 'redux'
import { usersReducer } from './usersReducer'
import { alertReducer } from './alertReducer'

export const rootReducer = combineReducers({
  userState: usersReducer,
  alerts: alertReducer
})

export type RootState = ReturnType<typeof rootReducer>
