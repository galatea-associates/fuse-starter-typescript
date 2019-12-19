import express, { Request, Response } from 'express'
import 'reflect-metadata'
import { getUser, getUsers } from './controllers/userController'
import { shutdownMongo } from './db/mongo'

const cors = require('cors')

const serverless = require('serverless-http')

export const app = express()

require('dotenv').config()

console.log('node version is next')
console.log(process.version)

app.use(express.json())

app.use(cors({
  origin: ["https://fuse-starter-typescript-frontend.netlify.com"]
}))

// try{
//   const swaggerUi = require('swagger-ui-express')
//   const YAML = require('yamljs')
//   const swaggerDocument = YAML.load('./api-documentation.yaml')
//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// }
// catch {
//   console.log("something went wrong with loading documentation, but will not fail")
// }

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

if (process.env.START_SERVER === 'true') {
  app.listen(process.env.SERVER_PORT , async function () {
    console.log('Listening on port 3000')
  })

  process.on('exit', async function () {
    console.log('index.ts received exit event')
    await shutdownMongo()
  })
}

module.exports = app
module.exports.handler = serverless(app)
