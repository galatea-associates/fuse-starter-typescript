import { RECEIVE_USERS, SET_USERS_FETCHING, UserActionTypes } from '../actions/user'
import { User } from '@fuse-starter-typescript/shared/models/User'

export interface IUsersState {
    isFetching?: boolean
    users?: User[]
 }
export function usersReducer (
  state: IUsersState = { isFetching: false },
  action: UserActionTypes) {
  switch (action.type) {
    case SET_USERS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        users: action.payload
      }
    default:
      return state
  }
}
