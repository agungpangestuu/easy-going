const express = require('express');
const CheckLogin = require('../helpers/checkLogin');
const router = express.Router()
const model = require('../models')


router.get('/',(req,res)=>{
  model.User.findAll().then(users=>{
    console.log(users);
    res.render('user',{dataUsers : users})
  })
})

router.get('/:id/addCarTobiding', (req,res)=>{
  model.User.findById(req.params.id).then(user=>{
    res.render('addMobil',{user : user})
  })
  
})

router.post('/:id/addCarTobiding', (req,res)=>{
  let dataMobil = {
    name : req.body.name,
    min_bid : req.body.min_bid,
    max_bid : req.body.max_bid,
    time : req.body.time,
    status : true,
    UserId : req.params.id
  }
  // console.log("masuk ke post")
  model.Mobil.create(dataMobil).then(()=>{
    console.log('Mobil Added')
    res.redirect('/mobil')
  })
})

router.get('/:id/bid',(req,res)=>{
  model.Mobil.findAll().then(dataMobil=>{
    model.User.findById(req.params.id).then(user=>{
      res.render('addBid',{dataMobil : dataMobil, user : user})
    })
  })
})

router.post('/:id/bid/:CarId',(req,res)=>{
  let dataBid ={
    UserId : req.params.id,
    MobilId : req.params.CarId,
    bid : req.body.bid
  }
  model.bidding.create(dataBid).then(()=>{
    console.log('Bid Accepted');
    res.redirect('/users')
  })
})










module.exports = router;

