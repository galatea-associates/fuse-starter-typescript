import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'

export const SET_USER_FETCHING = 'SET_USER_FETCHING'
export const RECEIVE_USER = 'RECEIVEUSER'

interface ISetUserFetchingAction {
    type: typeof SET_USER_FETCHING,
    payload: boolean
}

interface IReceiveUserAction {
    type: typeof RECEIVE_USER
    payload: IUser
}

export function receiveUser (payload: IUser): IReceiveUserAction {
  return {
    type: RECEIVE_USER,
    payload
  }
}

export function setUserFetching (payload: boolean): ISetUserFetchingAction {
  return {
    type: SET_USER_FETCHING,
    payload
  }
}

export type UserActionTypes = IReceiveUserAction | ISetUserFetchingAction
