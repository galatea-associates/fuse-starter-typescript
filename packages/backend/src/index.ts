import express from 'express'
import 'reflect-metadata'
import { shutdownMongo } from './db/mongo'
import { getUser, getUsers } from './controllers/userController'

const serverless = require('serverless-http')

export const app = express()

require('dotenv').config()


app.use(express.json())

try{
  const swaggerUi = require('swagger-ui-express')
  const YAML = require('yamljs')
  const swaggerDocument = YAML.load('./api-documentation.yaml')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
catch {
  console.log("something went wrong with loading documentation, but will not fail")
}

// this async wrapper allows us to make an async call, then catch any async errors with the .catch() block
// this will handle any "Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 3)"
// errors
let wrapper = (fn:any) => (...args:any[]) => fn(...args).catch(args[2])

// set up the routes
let router = express.Router()
router.get('/api/users', wrapper(getUsers))
router.get('/api/user/:uuid', wrapper(getUser))

// point the base route at the router
app.use("/", router)

// special for netlify functions, point /.netlify/functions at the router
app.use('/.netlify/functions/index', router)  // route to netlify lambda

// app.listen(3000, async function () {
//   console.log('Listening on port 3000')
// })

// process.on('exit', async function () {
//   console.log('index.ts received exit event')
//   await shutdownMongo()
// })

module.exports = app
module.exports.handler = serverless(app)