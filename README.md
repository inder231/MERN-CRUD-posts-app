
# BLOG POST

This project is build using express, mongoDB Atlas, mongoose, reactJs to give real life experience like other social media apps to post blogs, with all CRUD funtionalities.


## Tech Stack

**Client:** React, Redux, ChakraUI

**Server:** Node, Express, MongoDB Altas, Mongoose, 



## API Reference

```http
    https://backend-231.herokuapp.com/

 ```
 #### SignUp new user
 ```http
    POST /auth/signup
 ```
 ### LogIn user
 ```http
    POST /auth/login
  ```
  headers : Authorization : `Bearer ${token}`
#### Get all items
```http
   GET /profile/${userId}/feed
```
#### Create a blog

```http
   POST /profile/${userId}/feed
```
#### Update a blog
```http
    PATCH /profile/${userId}/feed/${postId}
```

#### Delete a blog

```http
    DELETE /profile/${userId}/feed/${postId}
```


## Demo
```http
    https://mern-insta-post.netlify.app/
```




## Lessons Learned

 - Mongo Atlas
 - Mongoose
 - MVC structure
 - Deploying backend on Heroku
 - Connecting frontend and backend
 - Uploading images
 - Multer
 - Cloudinary
 - jsonwebtoken to verify user
 - bcrypt to hash password

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLOUDINARY_API_KEY` `CLOUDINARY_SECRET_KEY` `CLOUD_NAME`

`JWT_SECRET_KEY`

`MONGODB_URL`

`PORT`


