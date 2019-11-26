import { app } from '../src'
import { expect } from 'chai'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import chai = require('chai')
import chaiHttp = require('chai-http')
import { shutdownMongo } from '../src/mongo'

chai.use(chaiHttp)

const doc = require('test2doc')


describe('controllers/userController.ts', function () {
  doc.group('Users').desc('Users controller').is((doc:any) => {
    it('should return a User when requested', async function () {
      await doc.action('Get all users').is(async (doc:any) => {
        const res = await chai.request(app).get(doc.get('/api/users'))
        const user: IUser = {
          firstName: 'Mike',
          lastName: 'Gajda'
        }
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body[0].firstName).to.equal(user.firstName)
        expect(res.body[0].lastName).to.equal(user.lastName)
        const body = doc.resBody(res.body)

        body[0].firstName.desc('User first name').should.be.a.String()
      })
    })
  })
  // after(async function() {
  //   await shutdownMongo()
  //   doc.emit('api-documentation.yaml', 'swagger')
  // })
})

// doc.group('#Users').is((doc:any) => {
//   describe('index.ts', function () {
//     doc.action('Get all users').is((doc:any) => {
//       it('should return a User when requested', function(done:any) {
//         chai.request(app).get(doc.get('/api/users')).end((err, res)=> {
//           console.log("body", res.body)
//
//           const user: IUser = {
//             firstName: 'Mike',
//             lastName: 'Gajda'
//           }
//           expect(res).to.have.status(200)
//           expect(res).to.be.json
//           expect(res.body[0].firstName).to.equal(user.firstName)
//           expect(res.body[0].lastName).to.equal(user.lastName)
//           //doc.resBody(res.body)
//           done()
//         })
//
//       })
//     })
//
//     after(async function() {
//       await shutdownMongo()
//       doc.emit('api-documentation.yaml', 'swagger')
//     })
//   })
// })

