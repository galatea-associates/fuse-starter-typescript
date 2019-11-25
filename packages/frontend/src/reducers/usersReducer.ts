import { SET_USERS_FETCHING, RECEIVE_USERS, UserActionTypes }
  from '../actions/user'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
export interface IUsersState {
    isFetching?: boolean
    users?: IUser[]
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
