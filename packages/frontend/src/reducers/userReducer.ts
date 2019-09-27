import {SET_USER_FETCHING, RECEIVE_USER, UserActionTypes}
 from '../actions/user'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
 export interface IUserState {
    isFetching?: boolean
    user?: IUser
 }
export function userReducer(
    state: IUserState = {isFetching: false},
    action: UserActionTypes){
        switch(action.type) {
            case SET_USER_FETCHING:
                return  {
                    ...state,
                    isFetching: action.payload
                }
            case RECEIVE_USER:
                return {
                    ...state,
                    isFetching: false,
                    user: action.payload
                }
            default:
                return state
        }
    }