const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use(cors())

const posts = require("./posts")

app.get('/insta_posts', (req, res) => {
  res.send(posts)
})

app.post('/insta_posts', (req, res) => {
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
  

  console.log(typeof post )
console.log(typeof post.username )
console.log(typeof post.message )
console.log(typeof post.image_url )
console.log(typeof post.username.length )
console.log(typeof post.message.length )
console.log(typeof post.image_url.length )
console.log(typeof post.comments )
  posts.push(post)
  res.send({message: "success"})
})

app.post('/insta_posts/:postId/comments', (req, res) => {
  const message = req.body.message
  const postId = parseInt(req.body.postId)
  
  const post = posts.find(post => post.id === postId)
  if (!post) {
    res.status(404)
    res.send({error: {message: `post not found with id ${postId}`}})
    return
  }

  post.comments.push({message})

  res.send({message: "success"})
})

app.post('/insta_posts/:postId/likes', (req, res) => {
  const postId = parseInt(req.body.postId)
  
  const post = posts.find(post => post.id === postId)
  if (!post) {
    res.status(404)
    res.send({error: {message: `post not found with id ${postId}`}})
    return
  }

  post.like_count++

  res.send({message: "success"})
})

app.listen(8080, () => console.log("listening on port 8080"))