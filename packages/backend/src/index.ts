import { shutdownMongo } from './db/mongo'
import app from './app'

if (process.env.START_SERVER === 'true') {
  app.listen(process.env.SERVER_PORT , async function () {
    console.log('Listening on port 3000')
  })

  process.on('exit', async function () {
    console.log('index.ts received exit event')
    await shutdownMongo()
  })
}