import { getDatabase } from '../db/mongo'
import { User } from '../models/User'
import { Request, Response } from 'express'

export async function getUsers (req: Request, res: Response) {
  // ensure we have a DB connection, and seed the database
  // todo: move seeding to another place, but for now
  const db = await getDatabase()
  // const user: IUser = new User()
  // user.firstName = "Mike"
  // user.lastName = "Gajda"
  // await db.add(User, user)

  // now get all the users
  const users: User[] = await db.find(User)
  res.send(users)
}

export async function getUser (req: Request, res: Response) {
  console.log('received request to /api/user/', req.params.uuid)
  // ensure we have a DB connection, and seed the database
  const db = await getDatabase()
  // now get all the users
  const user = await db.get(User, { uuid: req.params.uuid })
  res.send(user)
}
