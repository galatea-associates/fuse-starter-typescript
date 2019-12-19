import { app } from '../src'
import { expect } from 'chai'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import { shutdownMongo } from '../src/db/mongo'
import { MongoMemoryServer } from 'mongodb-memory-server'
import chai = require('chai')
import chaiHttp = require('chai-http')

chai.use(chaiHttp)

const doc = require('test2doc')

let requester: any
describe('controllers/userController.ts', async function () {
  before(async function () {
    console.log("will start mongoMemoryServer")
    const mongoMemoryServer = new MongoMemoryServer()
    let mongoUrl = await mongoMemoryServer.getUri()
    console.log(mongoUrl)
    process.env.MONGO_URL = mongoUrl
    process.env.SERVER_PORT = "3001"
    console.log('started a db connection')

    requester = chai.request(app).keepOpen()
  })
  doc.group('Users').desc('Users controller').is((doc: any) => {
    doc.action('Get all Users').is(async function (doc: any) {
      it('should return a list of Users when requested', async function () {
        const res = await requester.get(doc.get('/api/users'))
        const user: IUser = {
          uuid: 'test',
          firstName: 'Mike',
          lastName: 'Gajda'
        }
        expect(res).to.have.status(200)
        expect(res.body[0].firstName).to.equal(user.firstName)
        expect(res.body[0].lastName).to.equal(user.lastName)
        doc.resBody(res.body)
      })
    })
    doc.action('Get User by UUID').is(async function (doc: any) {
      it('should return a user by uuid', async function () {
        const res1 = await requester.get('/api/users')
        const uuid = res1.body[0].uuid
        const res2 = await requester.get(doc.get('/api/user/:uuid', { uuid: doc.val(uuid, 'UUID') }))
        doc.resBody(res2.body)
      })
    })
  })
  after(async function () {
    await shutdownMongo()
    requester.close()
    doc.emit('api-documentation.yaml', 'swagger')
  })
})
