const express = require('express');
const router = express.Router();
const models = require('../models');
const CheckLogin = require('../helpers/checkLogin');

router.get('/',CheckLogin,(req,res)=>{
  models.User.findById(req.session.userid).then((user)=>{
    models.Mobil.findAll().then((mobils)=>{
      models.bidding.findAll({
        where:{UserId:req.session.userid}
      }).then(bids=>{
        for(let i = 0;i < mobils.length;i++){
          for(let j = 0; j < bids.length;j++){
            if(mobils[i].id == bids[j].MobilId){
              bids[j].status = mobils[i].status
            }
          }
        }
        console.log(bids);
        res.render('profile',{profile : user , dataMobil : mobils , dataBiddings : bids, loggedIn:req.session.loggedIn})
      })
      
    })
  }).catch(err=>{
    console.log(err);
  })
})



module.exports = router;