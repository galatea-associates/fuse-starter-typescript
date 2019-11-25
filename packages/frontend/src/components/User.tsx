import React, { useEffect, useState } from 'react'
import { IAlert } from './Alert'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'

interface Props {
  user: IUser,
}

export function User (props:Props) {
  return (
    <div className={"card mb-2"}>
      <div className="card-body">
        <h5 className="card-title">{`${props.user.firstName} ${props.user.lastName}`}</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
        <a href="#" className="btn btn-primary">User Profile</a>
      </div>
    </div>
  )
}