import React, { useEffect } from "react"
import { receiveUser, setUserFetching } from "./actions/user";
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './reducers/rootReducer'
import { IUserState } from "./reducers/userReducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function App() {
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
            .then(user => dispatch(receiveUser(user)))
            .catch(reason => console.error(reason))
    }, [])
    // the [] notation here tells useEffect to run this effect only once to avoid
    // calling the api every time there is an update to the dom

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light r-auto bg-light">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">Fuse Starter TypeScript</li>
                </ul>
                
            </nav>
            <div className="container">
            <p>isFetching: {`${userState.isFetching}`}</p>
            <p>Name: {!userState.isFetching && userState.user ? `${userState.user.firstName} ${userState.user.lastName}` : ""}</p>
            </div>
            
        </div>

    )
}