import { app } from '../src'
import { expect } from 'chai'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import chai = require('chai')
import chaiHttp = require('chai-http')
import { shutdownMongo } from '../src/mongo'

chai.use(chaiHttp)

describe('index.ts', function () {
  it('should return a User when requested', function (done) {
    chai.request(app).get('/api/users').end((err, res) => {
      const user: IUser = {
        firstName: 'Mike',
        lastName: 'Gajda'
      }
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body[0].firstName).to.equal(user.firstName)
      expect(res.body[0].lastName).to.equal(user.lastName)
      done()
    })
  })
  after(async function() {
    await shutdownMongo()
  })
})
