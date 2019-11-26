import { app } from '../src'
import { expect } from 'chai'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import chai = require('chai')
import chaiHttp = require('chai-http')
import { shutdownMongo } from '../src/mongo'
const doc = require('test2doc')

chai.use(chaiHttp)

describe('index.ts', function () {
  it('should return a User when requested', async function () {
    let res = await chai.request(app).get('/api/users')
    const user: IUser = {
      firstName: 'Mike',
      lastName: 'Gajda'
    }
    expect(res).to.have.status(200)
    expect(res).to.be.json
    expect(res.body[0].firstName).to.equal(user.firstName)
    expect(res.body[0].lastName).to.equal(user.lastName)
  })
  after(async function() {
    await shutdownMongo()
    doc.emit('api-documentation.yaml', 'swagger')
  })
})
