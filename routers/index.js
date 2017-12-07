const express = require('express');
const Models = require('../models');
const bcrypt = require('bcrypt');
const CheckLogin = require('../helpers/checkLogin');
const Mail = require('../helpers/mail');
const router = express.Router();

// Homepage
router.get('/',(req,res)=>{
  Models.Mobil.findAll({include : [ Models.bidding] }).then(listItemBid =>{
    // res.send(listItemBid)
    res.render('index',{items : listItemBid ,loggedIn : req.session.loggedIn }) 
  })
})

router.get('/:CarId/profileBidding',(req,res)=>{
  Models.Mobil.findById(req.params.CarId,{include : [ Models.User ,Models.bidding] ,order : [[ { model: Models.bidding }, 'bid'  ]]}).then((databidding)=>{
    // res.send(databidding)
    res.render('itemBid',{item : databidding , loggedIn : req.session.loggedIn, role : req.session.role })
  })
})

router.post('/:CarId/profileBidding',(req,res)=>{
  Models.bidding.find({
    where:{UserId : req.session.userid, MobilId: req.params.CarId}
  }).then(bid=>{
    if(bid){
      let dataBid = {
        UserId:req.session.userid,
        MobilId:req.params.CarId,
        bid : req.body.bid
      }
      Models.bidding.update(dataBid,{where:{id : bid.id}})
      .then(update=>{
        res.redirect('/profile')
      })
      
      // res.send(dataBid)
    }
    else{
      let dataBid ={
        UserId : req.session.userid,
        MobilId : req.params.CarId,
        bid : req.body.amount
      }
      // res.send(dataBid)
      Models.bidding.create(dataBid).then(()=>{
        res.redirect('/profile')
      })
    }
  })
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
          // Mail(user.email)
          // assign session if password true
          req.session.loggedIn = true
          req.session.role = user.role  // if want role check in all page
          req.session.userid = user.id  //save userid if already login in session 
          // res.send('Berhasil Login')
          res.redirect('/profile') //belom diset ke mana directnya
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
  res.redirect('/login') //belom diset direct kemana
})
//end logout fungsional root

//funsional register route

router.get('/register',(req,res)=>{
  let errMsg = ''
  if(req.query.error){
    errMsg = 'Email is already in Use'
  }
  res.render('register',{msg:errMsg})
})

router.post('/register',(req,res)=>{
  let dataRegis = {
    email : req.body.email,
    password : req.body.password,
    role : req.body.role
  }
  Models.User.create(dataRegis)
  .then(()=>{
    res.redirect('/login')
  })
  .catch((err) => {
    res.redirect('/register?error=true');
  })
})
//end fungsional route

module.exports = router;