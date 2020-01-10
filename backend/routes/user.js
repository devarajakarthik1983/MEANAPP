const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post('/signup' , (req , res ,next)=>{
    bcrypt.hash(req.body.password , 10)
    .then(hash=>{
        const newUser = new User({
            email: req.body.email,
            password: hash,
        });
        newUser.save()
        .then(result=>{
            res.status(201).json({
                message: 'User created successfully',
                result: result
            })
            .catch((err)=>{
                res.status(500).json({
                    error: err,
                })
            })
        })
    })

});

router.post('/login' ,(req , res, next)=>{
    let fectchedUser;
    User.findOne({email: req.body.email})
    .then(user=>{
        if(!user) {
            return res.status(401).json({
                message: 'Auth Failed',
            })
        }
        fectchedUser =user;
        return bcrypt.compare(req.body.password, user.password);
    }).then( result=>{
        if(!result) {
            return res.status(401).json({
                message: 'Auth Failed',
            })
        }
        const token =jwt.sign({
            email:fectchedUser.email,
            userId: fectchedUser._id
        } , 'my_secret_code_is_karthik' , {expiresIn:"1h"});
        res.status(200).json({
            token:token
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message: 'Auth Failed',
        })
    })
})


module.exports =router;