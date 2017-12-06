const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/',(req,res)=>{
  models.User.findById(req.session.userid).then((user)=>{
    models.Mobil.findAll().then((mobils)=>{
      models.bidding.findAll({
        where:{UserId:req.session.userid}
      }).then(bids=>{
        console.log(bids);
        res.render('profile',{profile : user , dataMobil : mobils , dataBiddings : bids})
      })
      
    })
  }).catch(err=>{
    console.log(err);
  })
})



module.exports = router;