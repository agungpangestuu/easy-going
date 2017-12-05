const express = require('express');
const router = express.Router()
const model = require('../models')


router.get('/',(req,res)=>{
  model.User.findAll().then(users=>{
    console.log(users);
    res.render('user',{dataUsers : users})
  })
})










module.exports = router;

