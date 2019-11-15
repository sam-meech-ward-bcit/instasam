const { ObjectId, MongoClient } = require('mongodb')
const assert = require('assert')

// Connection URL
const url = process.env.MONGODB_URI
 
// Database Name
const dbName = 'heroku_9p4b2gfl'

let db, posts

async function connect() {
  const client = new MongoClient(url,  { useUnifiedTopology: true })

  await client.connect()
  db = client.db(dbName)
  posts = db.collection('insta_posts')
  return db
}
exports.connect = connect

async function getPosts() {
  const found = await posts.find({}).limit(50).toArray()
  return found.map(post => {
    post.id = post._id
    return post
  })
}
exports.posts = getPosts

async function savePost(post) {
    return await posts.insertOne(post)
}
exports.savePost = savePost

async function findPost(postId) {
  const objectId = new ObjectId(postId);
  const found = await posts.find({_id: objectId}).toArray()
  if (found.length === 0) {
    throw "No Post with id "+ postId
  }
  return found[0]
}
exports.findPost = findPost

async function addComment(postId, message) {
  const post = await findPost(postId)
  console.log(postId, post)
  post.comments.push({message})
  const objectId = new ObjectId(postId);
  const r = await posts.updateOne({_id: objectId}, {$set: {comments: post.comments}});
  return r
}
exports.addComment = addComment

async function incrementLikeCount(postId) {
  const post = await findPost(postId)
  if (!post.like_count) {
    post.like_count = 1
  } else {
    post.like_count++
  }
  const objectId = new ObjectId(postId);
  const r = await posts.updateOne({_id: objectId}, post);
  return r
}
exports.incrementLikeCount = incrementLikeCount
