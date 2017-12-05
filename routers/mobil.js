const express = require('express');
const Models = require('../models');

const routers = express.Router();

routers.get('/' , (req,res)=>{
  res.render('mobil')
})

routers.get('/:id/addCarTobiding', (req,res)=>{
  res.render('addMobil')
})

routers.post('/:id/addCarTobiding', (req,res)=>{
  let dataMobil = {
    name : req.body.name,
    min_bid : req.body.min_bid,
    max_bid : req.body.mix_bid,
    time : req.body.time,
    status : 'open',
    UserId : req.params.id
  }
  Models.Mobil.create(dataMobil).then(()=>{
    console.log('Mobil Added')
  })
})

routers.get('/:id/delete', (req,res)=>{
  Models.Mobil.destroy({where: {id : req.params.id}})
  .then(()=>{
  res.redirect('/')  
  })
})






module.exports = routers;