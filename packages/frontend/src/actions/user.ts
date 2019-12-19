import { User } from '@fuse-starter-typescript/shared/models/User'

export const SET_USERS_FETCHING = 'SET_USERS_FETCHING'
export const RECEIVE_USERS = 'RECEIVE_USERS'

interface ISetUserFetchingAction {
    type: typeof SET_USERS_FETCHING,
    payload: boolean
}

interface IReceiveUserAction {
    type: typeof RECEIVE_USERS
    payload: User[]
}

export function receiveUsers (payload: User[]): IReceiveUserAction {
  return {
    type: RECEIVE_USERS,
    payload
  }
}

export function setUserFetching (payload: boolean): ISetUserFetchingAction {
  return {
    type: SET_USERS_FETCHING,
    payload
  }
}

export type UserActionTypes = IReceiveUserAction | ISetUserFetchingAction
