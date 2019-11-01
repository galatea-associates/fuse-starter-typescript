import { app } from '../src'
import { expect } from 'chai'
import chai = require('chai')
import chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('index.ts', function () {
  it('should return a User when requested', function (done) {
    chai.request(app).get('/api/test').end((err, res) => {
      expect(res).to.have.status(200)
      done()
    })
  })
})