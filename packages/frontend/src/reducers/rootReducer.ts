import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import { alertReducer } from './alertReducer'

export const rootReducer = combineReducers({
    userState: userReducer,
    alerts: alertReducer
})

export type RootState = ReturnType<typeof rootReducer>