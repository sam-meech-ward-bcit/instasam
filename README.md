## Endpoints

### Insta Posts

#### GET all Posts

```
GET https://instasam-one.herokuapp.com/api/insta_posts
```

#### POST a new post

```
POST https://instasam-one.herokuapp.com/api/insta_posts
```

##### Body (JSON)

```json
{
  "username": "", 
  "message": "",
  "image_url": "",
  "comments": []
}
```

### Comments

#### Post a comment

```
POST https://instasam-one.herokuapp.com/api/insta_posts/:postId/comments
```

Replace :postId with the id of the insta post.

##### Body (JSON)

```json
{
  "message": ""
}
```

#### Post a like

```
POST https://instasam-one.herokuapp.com/api/insta_posts/:postId/likes
```

Replace :postId with the id of the insta post.# instasam
