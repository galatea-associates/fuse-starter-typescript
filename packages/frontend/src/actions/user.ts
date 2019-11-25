import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'

export const SET_USERS_FETCHING = 'SET_USERS_FETCHING'
export const RECEIVE_USERS = 'RECEIVE_USERS'

interface ISetUserFetchingAction {
    type: typeof SET_USERS_FETCHING,
    payload: boolean
}

interface IReceiveUserAction {
    type: typeof RECEIVE_USERS
    payload: IUser[]
}

export function receiveUsers(payload: IUser[]): IReceiveUserAction {
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
