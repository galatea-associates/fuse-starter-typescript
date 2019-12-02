import React, { useEffect } from 'react'
import { receiveUsers, setUserFetching } from './actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './reducers/rootReducer'
import { IUsersState } from './reducers/usersReducer'
import { addAlert } from './actions/alert'
import { UserComponent } from './components/UserComponent'
import { User } from '@fuse-starter-typescript/shared/models/User'

export function Home () {
  const dispatch = useDispatch()
  const userState: IUsersState = useSelector((state: RootState) => state.userState)
  console.log('userState =', userState)
  useEffect(() => {
    dispatch(setUserFetching(true))
    window.fetch(`${process.env.BACKEND_PATH}/api/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response
      })
      .then(response => response.text())
      .then(response => JSON.parse(response) as User[])
      .then(users => {
        dispatch(addAlert({ ok: true, status: 'Successfully fetched the users' }))
        dispatch(receiveUsers(users))
      })
      .catch((error: Error) => {
        dispatch(addAlert({ ok: false, status: error.message }))
        dispatch(setUserFetching(false))
      })
  }, [])
  // the [] notation here tells useEffect to run this effect only once to avoid
  // calling the api every time there is an update to the dom

  // todo: look at this ternary
  return (
    <div>
      <h1>Users</h1>
      <React.Fragment>
      {(!userState.isFetching && userState.users) ? userState.users.map(user => {
          console.log('user = ', user)
          return (<UserComponent user={user}/>)
        })
        : ''}
      </React.Fragment>
    </div>
  )
}
