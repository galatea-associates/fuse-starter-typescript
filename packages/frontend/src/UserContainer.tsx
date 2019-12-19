import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '@fuse-starter-typescript/shared/models/User'
import { addAlert } from './actions/alert'
import { useDispatch } from 'react-redux'
import { UserComponent } from './components/UserComponent'

export function UserContainer () {
  const [user, setUserState] = useState()
  const { uuid } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    window.fetch(`${process.env.BACKEND_PATH}/api/user/${uuid}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response
      })
      .then(response => response.text())
      .then(response => JSON.parse(response) as User)
      .then(user => {
        dispatch(addAlert({ ok: true, status: 'Successfully fetched the user' }))
        setUserState(user)
      })
      .catch((error: Error) => {
        dispatch(addAlert({ ok: false, status: error.message }))
      })
  }, [])

  return (
    <div>
      {user ? <UserComponent user={user} /> : 'loading'}
    </div>

  )
}
