import express from 'express'
import 'reflect-metadata'
import { shutdownMongo } from './mongo'
import { getUser, getUsers } from './controllers/userController'

export const app = express()

app.use(express.json())
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api-documentation.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/api/users', getUsers)

app.get('/api/user/:uuid', getUser)

app.listen(3000, async function () {
  console.log('Listening on port 3000')
})

process.on('exit', async function () {
  console.log('index.ts received exit event')
  await shutdownMongo()
})
