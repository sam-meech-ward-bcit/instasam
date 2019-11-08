const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use(express.static('public'))

app.use(cors())

function connect(database) {
  return new Promise((resolve, reject) => {

    app.get('/api/insta_posts', async (req, res) => {
      const posts = await database.posts()
      res.send(posts)
    })

    app.post('/api/insta_posts', async (req, res) => {
      const post = req.body.post
      if (!post || 
        typeof post !== 'object' || 
        typeof post.username !== 'string' || 
        typeof post.message !== 'string' || 
        typeof post.image_url !== 'string' || 
        post.username.length === 0 || 
        post.message.length === 0 || 
        post.image_url.length === 0 || 
        typeof post.comments !== 'object'
        ) {
        res.status(400)
        res.send({'error': {message: `invalid post`, post}})
        return
      }

      await database.savePost(post)
      res.send({message: "success"})
    })

    app.post('/api/insta_posts/:postId/comments', async (req, res) => {
      const message = req.body.message
      const postId = req.body.postId
      
      const post = await database.findPost(postId)
      if (!post) {
        res.status(404)
        res.send({error: {message: `post not found with id ${postId}`}})
        return
      }
      
      await database.addComment(postId, message)

      res.send({message: "success"})
    })

    app.post('/api/insta_posts/:postId/likes', async (req, res) => {
      const postId = req.body.postId
      
      const post = await database.findPost(postId)
      if (!post) {
        res.status(404)
        res.send({error: {message: `post not found with id ${postId}`}})
        return
      }

      database.incrementLikeCount(postId)

      res.send({message: "success"})
    })

    const port = process.env.PORT || 8080
    app.listen(port, () => {
      resolve(port)
    })
  })
}
exports.connect = connect