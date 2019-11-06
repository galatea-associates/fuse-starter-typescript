import { app } from '../src'
import { expect } from 'chai'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import chai = require('chai')
import chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('index.ts', function () {
  it('should return a User when requested', function (done) {
    chai.request(app).get('/api/test').end((err, res) => {
      const user: IUser = {
        firstName: 'First',
        lastName: 'Last'
      }
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.deep.equal(user)
      done()
    })
  })
})
