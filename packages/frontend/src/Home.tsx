import React, { useEffect } from "react";
import { receiveUser, setUserFetching } from "./actions/user";
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './reducers/rootReducer'
import { IUserState } from "./reducers/userReducer";
import {addAlert} from "./actions/alert";

export function Home() {
    const dispatch = useDispatch()
    const userState: IUserState = useSelector((state: RootState) => state.userState)
    console.log("userState =", userState)
    useEffect(() => {
        dispatch(setUserFetching(true))
        fetch('/api/test')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.text())
            .then(response => JSON.parse(response) as IUser)
            .then(user => {
                dispatch(addAlert({ok: true, status: "Successfully fetched the user"}))
                dispatch(receiveUser(user))
            })
            .catch((error: Error) => {
                dispatch(addAlert({ok: false, status: error.message}))
                dispatch(setUserFetching(false))
            })
    }, [])
    // the [] notation here tells useEffect to run this effect only once to avoid
    // calling the api every time there is an update to the dom

    return (
        <React.Fragment>
            <p>isFetching: {`${userState.isFetching}`}</p>
            <p>Name: {!userState.isFetching && userState.user ? `${userState.user.firstName} ${userState.user.lastName}` : ""}</p>
        </React.Fragment>
    )
}