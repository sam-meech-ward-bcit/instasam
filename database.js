const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = 'mongodb://heroku_9p4b2gfl:4eh3oejnejhh185eh0noq9ah0t@ds141248.mlab.com:41248/heroku_9p4b2gfl'
 
// Database Name
const dbName = 'heroku_9p4b2gfl'

function connect() {
  return new Promise((resolve, reject) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
      if (err) {
        reject(err)
        return
      }
      const db = client.db(dbName)
      resolve(db)
    })
  })
}
exports.connect = connect
 
