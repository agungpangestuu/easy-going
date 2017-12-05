const express = require('express');
const Models = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/',(req,res)=>{
  res.send('aslaksl')
})

router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/login',(req,res)=>{
  Models.User.findOne({
    where : {
      email : req.body.email
    }
  })
  res.send(req.body)
})

router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',(req,res)=>{
  let dataRegis = {
    email : req.body.email,
    password : req.body.password,
    role : 'pembeli'
  }
  Models.User.create(dataRegis)
  .then(()=>{
    res.redirect('/login')
  })
  .catch((err) => {
    console.log(err);
  })
})


module.exports = router;