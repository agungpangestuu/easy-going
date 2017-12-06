const express = require('express');
const Models = require('../models');

const routers = express.Router();



//kalo mau table list mobil di update sesuai id nanti mesti ada id siapa yang logged in
//(mungkin di session?)

routers.get('/' , (req,res)=>{
  Models.Mobil.findAll().then((dataMobil)=>{    //where:id = session ID
    let promiseMobil = dataMobil.map(mobil=>{
      return new Promise ((resolve,reject)=>{
        Models.User.findAll({
          where:{
            id:mobil.UserId
          }
        }).then(result=>{
          console.log('======================',result[0].email);
          if(result[0].email == null){
            mobil.owner = ''
          }
          else{
            mobil.owner = result[0].email
          }
          console.log(mobil);
          resolve(mobil)
        })
        .catch(err=>{
          reject(err);
        })
      })
    })
  Promise.all(promiseMobil).then(dataMobil=>{
    // console.log(dataMobil);
  res.render('mobil',{dataMobil : dataMobil})
   })
  })
})

// 
// routers.get('/',(req,res)=>{
//   Models.Mobil.findAll().then(dataMobil=>{
//     res.render('mobil',{dataMobil : dataMobil})
//   })
// })



routers.get('/:id/delete', (req,res)=>{
  Models.Mobil.destroy({where: {id : req.params.id}})
  .then(()=>{
  res.redirect('/mobil')  
  })
})






module.exports = routers;