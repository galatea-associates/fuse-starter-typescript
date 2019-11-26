import { app } from '../src'
import { expect } from 'chai'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import chai = require('chai')
import chaiHttp = require('chai-http')
import { shutdownMongo } from '../src/mongo'

chai.use(chaiHttp)

const doc = require('test2doc')

let requester: any
describe('controllers/userController.ts', async function () {
  before(function () {
    requester = chai.request(app).keepOpen()
  })
  doc.group('Users').desc('Users controller').is((doc:any) => {
    doc.action('Get all Users').is(async function (doc:any) {
      it('should return a list of Users when requested', async function () {
        const res = await requester.get(doc.get('/api/users'))
        const user: IUser = {
          firstName: 'Mike',
          lastName: 'Gajda'
        }
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body[0].firstName).to.equal(user.firstName)
        expect(res.body[0].lastName).to.equal(user.lastName)
        doc.resBody(res.body)

      })
    })
  })
  after(async function() {
    await shutdownMongo()
    requester.close()
    doc.emit('api-documentation.yaml', 'swagger')
  })
})
