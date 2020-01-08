const express = require('express');

const Post = require('../model/post');

const router = express.Router();


router.post("", (req, res, next) => {
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
  
  router.get('/:id' ,(req,res,next)=>{
    Post.findById(req.params.id)
    .then(post=>{
      if(post) {
        res.status(200).json(post)
      } else {
        res.status(400).json({message:'Unable to find the post'})
      }
    })
  })
  
  router.put('/:id' , (req , res , next)=>{
    const post = new Post({
      _id:req.body.id,
      title: req.body.title,
      content: req.body.content
    })
    Post.updateOne({_id: req.params.id} , post)
    .then((result)=>{
      console.log(result);
      res.status(200).json({
        message:'Updated successfully',
      })
    })
  })
  
  router.get("", (req, res, next) => {
    Post.find()
    .then(posts=>{
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: posts
      });
    })
    
  });
  
  router.delete('/:id' , (req,res)=>{
    Post.deleteOne({_id: req.params.id})
    .then((data)=>{
      console.log(data);
      res.status(200).json({message: 'Post deleted successfully'});
    }).catch(err=>{
      console.log(err);
    });
  });

  module.exports =router;