const postsContainer = document.querySelector("#posts-container")

function createPostElement(post) {
  const postContainer = document.createElement("div")

  const postElement = document.createElement("article")
  postElement.classList.add("post")
  postContainer.appendChild(postElement)

  const postHeader = document.createElement("header")
  postHeader.classList.add("post__header", "post__inset")
  postElement.appendChild(postHeader)

  const postHeading = document.createElement("p")
  postHeading.classList.add("post__heading")
  postHeading.innerText = post.username
  postHeader.appendChild(postHeading)

  const postLinks = document.createElement('div')
  postLinks.classList.add('post__links')
  postHeader.appendChild(postLinks)

  const favoriteButton = document.createElement('i')
  favoriteButton.classList.add("material-icons", "favorite-icon", 'button')
  favoriteButton.innerText = 'favorite'
  postLinks.appendChild(favoriteButton)

  favoriteButton.addEventListener("click", () => {
    likePost(post.id)
  })

  const commentButton = document.createElement('i')
  commentButton.classList.add("material-icons", "comment-icon", 'button')
  commentButton.innerText = 'comment'
  postLinks.appendChild(commentButton)

  commentButton.addEventListener("click", () => {
    postComments(post.id)
  })

  const shareButton = document.createElement('i')
  shareButton.classList.add("material-icons", "share-icon", 'button')
  shareButton.innerText = 'share'
  postLinks.appendChild(shareButton)

  shareButton.addEventListener("click", () => {
    sharePost(post.id)
  })
  
  const postFigure = document.createElement("figure")
  postFigure.classList.add("post__figure")
  postElement.appendChild(postFigure)
  
  const postImage = document.createElement('img')
  postImage.classList.add("post__image")
  postImage.setAttribute("src", post.image_url)
  postFigure.appendChild(postImage)
  
  const postCaption = document.createElement("figcaption")
  postCaption.classList.add("post__caption", "post__inset")
  postCaption.innerText = post.message
  postFigure.appendChild(postCaption)

  const commentsContainer = document.createElement("section")
  commentsContainer.classList.add("comments-container", "post__inset")
  postElement.appendChild(commentsContainer)

  const comments = document.createElement("ul")
  comments.classList.add("comments")
  commentsContainer.appendChild(comments)

    for (const postComment of post.comments) {
      const comment = document.createElement("li")
      const commentIcon = document.createElement('i')
      commentIcon.classList.add("material-icons", "comment-icon")
      commentIcon.innerText = "account_box"
      comment.appendChild(commentIcon)

      comment.innerText = postComment.message

      comments.appendChild(comment)
    }

  const form = document.createElement('form')
  form.classList.add("comment-form");
  form.innerHTML = 
    `<input id="comment-message" class="comment-form__comment" type="text" name="comment" placeholder="Add a comment...">
    <button class="comment-form__button">Post</button>`

  form.addEventListener("submit", function(event) {
    event.preventDefault()
    const message = form.querySelector("#comment-message").value

    createNewComment(post.id, message)
  })

  postElement.appendChild(form)
  return postContainer
}

function createNewPost(username, imageURL, message) {
  const post = {
    username, 
    message,
    image_url: imageURL,
    comments: []
  }

  fetch(`api/insta_posts`, {
    method: 'POST',
    body: JSON.stringify({post}),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if (!response.ok){
      return new Promise((_, reject) => response.json().then(reject));
    }
    return response.json()
  })
  .then(json => {
    console.log(json)
    return fetchAllPosts()
  })
  .then(() => {
    console.log("ok")
  })
  .catch(error => {
    console.log("error", error)
  })
}

function createNewComment(postId, message) {

  fetch(`api/insta_posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({message, postId}),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(fetchAllPosts)
  .then(() => {
    console.log("ok")
  })
  .catch(error => {
    console.log(error)
  })

}

function loadPosts(posts) {
  postsContainer.innerHTML = '';
  for (const post of posts.reverse()) {
    const postElement = createPostElement(post)
    postsContainer.appendChild(postElement)
  }
}

document.querySelector("#post-form").addEventListener("submit", function(event) {
  event.preventDefault()
  const username = document.querySelector("#post-form-username").value
  const imageURL = document.querySelector("#post-form-image_url").value
  const comment = document.querySelector("#post-form-comment").value
  createNewPost(username, imageURL, comment)
})

function likePost(postId) {
  console.log("likePost", postId)
}
function postComments(postId) {
  console.log("postComments", postId)
}
function sharePost(postId) {
  console.log("share post", postId)
}

function fetchAllPosts() {
  fetch('api/insta_posts')
  .then(data => {
    return data.json()
  })
  .then(json => {
    loadPosts(json)
  })
  .catch(error => {
    console.log(error)
  })
}
fetchAllPosts()
