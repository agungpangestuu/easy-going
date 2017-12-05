const express = require('express');
const Models = require('../models');
const bcrypt = require('bcrypt');
const CheckLogin = require('../helpers/checkLogin');
const Mail = require('../helpers/mail');
const router = express.Router();

// Homepage
router.get('/',(req,res)=>{
  res.send("../views/login") // belom diset homepage
})

//funsional route login
router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/login',(req,res)=>{
  Models.User.findOne({
    where : {
      email : req.body.email
    }
  })
  .then(function(user){
    if(user){
      bcrypt.compare(req.body.password, user.password).then(function(result) {
        if (result) {
          // assign session if password true
          req.session.loggedIn = true
          // req.session.role = user.role  // if want role check in all page
          req.session.userid = user.id  //save userid if already login in session 
          Mail(user.email)
          res.send('Berhasil Login')
          res.redirect('/') //belom diset ke mana directnya
        }
        else{
          res.render('login', {error: true}) // error is handler or return back view with error
        }
      })
    }else{
      res.render('login', {error: true})
    }
  })
  .catch((err) => {
    res.render('login', {error: true})
  })
})
//end fungsional login route

//logout fungsional
router.get('/logout',(req,res)=>{
  req.session.loggedIn = false
  res.redirect('/') //belom diset direct kemana
})
//end logout fungsional root

//funsional register route

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
//end fungsional route

module.exports = router;