const database = require('./database')
const server = require('./server')

;(async () => {
  await database.connect()
  const port = await server.connect(database)
  console.log(`listening on port ${port}`)
})()