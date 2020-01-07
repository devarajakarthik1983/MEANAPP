const express = require('express');

const app = express();

app.use((req , res, next)=>{
  console.log('I am middleware');
  next();
});

app.use((req,res,next)=>{
  res.send('Hey I am response');
});

module.exports = app;
