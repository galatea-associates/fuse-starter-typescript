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
    doc.action('Get all users').is(async function (doc:any) {
      it('should return a User when requested', async function () {
        console.log("I'm in here")
        const res = await requester.get(doc.get('/api/users'))
        console.log(res.body)
        const user: IUser = {
          firstName: 'Mike',
          lastName: 'Gajda'
        }
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body[0].firstName).to.equal(user.firstName)
        expect(res.body[0].lastName).to.equal(user.lastName)
        let body = doc.resBody(res.body)
        console.log("body", body)

        //body[0].firstName.desc('User first name')
      })
    })
  })
  after(async function() {
    await shutdownMongo()
    requester.close()
    doc.emit('api-documentation.yaml', 'swagger')
  })
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
//           doc.resBody(res.body.toString())
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

