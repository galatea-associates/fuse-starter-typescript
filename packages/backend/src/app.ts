import express, { Request, Response } from 'express'
import 'reflect-metadata'
import { getUser, getUsers } from './controllers/userController'

require('dotenv').config()
const cors = require('cors')

const serverless = require('serverless-http')

export const app = express()



console.log('node version is next')
console.log(process.version)

app.use(express.json())

// todo: limit this to just a few domains, but for ease of use leave wide open for now
app.use(cors())

try{
  const swaggerUi = require('swagger-ui-express')
  const YAML = require('yamljs')
  const swaggerDocument = YAML.load('./api-documentation.yaml')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  // need to duplicate this to make the documentation available to the .netlify endpoint
  app.use('/.netlify/functions/index/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
catch {
  console.log("something went wrong with loading documentation, but will not fail")
}

// this async wrapper allows us to make an async call, then catch any async errors with the .catch() block
// this will handle any "Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 3)"
// errors
const wrapper = (fn:any) => (...args:any[]) => fn(...args).catch(args[2])

// set up the routes
const router = express.Router()
router.get('/health', function (req: Request, res: Response) {
  res.send('up')
})
router.get('/api/users', wrapper(getUsers))
router.get('/api/user/:uuid', wrapper(getUser))

// point the base route at the router
app.use('/', router)

// special for netlify functions, point /.netlify/functions at the router
app.use('/.netlify/functions/index', router) // route to netlify lambda

export default app
module.exports = app
module.exports.handler = serverless(app)
