import { getDatabase } from '../db/mongo'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import { User } from '@fuse-starter-typescript/shared/models/User'
import { Request, Response } from 'express'

export async function getUsers(req: Request, res: Response) {
  // ensure we have a DB connection, and seed the database
  // todo: move seeding to another place, but for now
  let db = await getDatabase()
  const user: IUser = new User()
  user.firstName = "Mike"
  user.lastName = "Gajda"
  await db.add(User, user)

  // now get all the users
  let users: User[] = await db.find(User)
  res.send(users)
}

export async function getUser(req: Request, res: Response) {
  console.log("received request to /api/user/", req.params.uuid)
  // ensure we have a DB connection, and seed the database
  let db = await getDatabase()
  // now get all the users
  let user = await db.get(User, {uuid: req.params.uuid})
  res.send(user)
}