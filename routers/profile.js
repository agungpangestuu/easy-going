const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/',(req,res)=>{
  models.User.findById(req.session.id).then((result)=>{
    res.render('profile',{profile : result})
  })
})

router.get('/',(req,res)=>{
  
})