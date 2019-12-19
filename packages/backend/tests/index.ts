import { expect } from 'chai'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import { getDatabase, shutdownMongo } from '../src/db/mongo'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../src/app'
import { User } from '../src/models/User'
import chai = require('chai')
import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const doc = require('test2doc')

let requester: any
let mongoMemoryServer: MongoMemoryServer

// todo: move these to a fixture
let userFirstName = "Mike"
let userLastName = "Gajda"
describe('controllers/userController.ts', async function () {
  before(async function () {
    // 1. we need to start a mongo memory server so that we don't have outside dependency on Mongo being up
    console.log("will start mongoMemoryServer")
    mongoMemoryServer = new MongoMemoryServer()
    let mongoUrl = await mongoMemoryServer.getUri()
    // 2. we need to set the mongo url so that the app can connect to it

    process.env.MONGO_URL = mongoUrl
    console.log('started a db connection')

    // 3. now we need to seed the DB with a fake user
    const db = await getDatabase()
    const user: IUser = new User()
    user.firstName =  userFirstName
    user.lastName = userLastName
    await db.add(User, user)

    // 4. finally, we're able to instantiate the app. We'll ask chai to keepOpen() so we don't
    // have to recreate it all the time
    requester = chai.request(app).keepOpen()
  })
  doc.group('Users').desc('Users controller').is((doc: any) => {
    doc.action('Get all Users').is(async function (doc: any) {
      it('should return a list of Users when requested', async function () {
        const res = await requester.get(doc.get('/api/users'))
        expect(res).to.have.status(200)
        expect(res.body[0].firstName).to.equal(userFirstName)
        expect(res.body[0].lastName).to.equal(userLastName)
        doc.resBody(res.body)
      })
    })
    doc.action('Get User by UUID').is(async function (doc: any) {
      it('should return a user by uuid', async function () {
        const res1 = await requester.get('/api/users')
        const uuid = res1.body[0].uuid
        const res2 = await requester.get(doc.get('/api/user/:uuid', { uuid: doc.val(uuid, 'uuid of this user') }))
        doc.resBody(res2.body)
      })
    })
  })
  after(async function () {
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop()
    }
    await shutdownMongo()
    requester.close()
    doc.emit('api-documentation.yaml', 'swagger')
  })
})
