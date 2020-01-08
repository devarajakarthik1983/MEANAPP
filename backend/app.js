const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./model/post');

const app = express();

mongoose.connect("mongodb+srv://karthik:@cluster0-ur5hs.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
  console.log('Connected to database');
} , (err)=>{
  console.log('Not Connected' ,err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
      title:req.body.title , 
      content: req.body.content
    });
    post.save()
    .then(createdPost=>{
      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost._id
      });
    });
  
  
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
  .then(posts=>{
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts
    });
  })
  
});

app.delete('/api/posts/:id' , (req,res)=>{
  Post.deleteOne({_id: req.params.id})
  .then((data)=>{
    console.log(data);
    res.status(200).json({message: 'Post deleted successfully'});
  }).catch(err=>{
    console.log(err);
  });
});

module.exports = app;
