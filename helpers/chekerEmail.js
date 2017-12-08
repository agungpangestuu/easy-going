const Models = require('../models');
const Mail = require('../helpers/mail')

function cekEmail() {
  Models.Mobil.findAll({include :[Models.bidding],order: [ [ Models.bidding, 'bid' ,'DESC'] ]}).then(dataBidding=>{

    let tempBid = 0
    let tempUserId = null
    dataBidding.forEach(data => {
      if (data.bidding>0) {
        for (let i = 0; i < data.bidding.length; i++) {
          if (!dataBidding.status && data.biddings[i].statusWin) {
            let updateData = {
              alreadyEmail :true
            }
            Models.User
            .findById(data.biddings[i].UserId)
            .then((err,result)=>{
              Mail(result.email)
            })
            Models.Mobil
            .findById(data.biddings[i].Mobil.Id)
            .then((err,mobil)=>{
              Models.User
              .findById(mobil.UserId)
              .then((err,user)=>{
                Mail(user.email)
              })
            })
          }
          // else if (!dataBidding.status && data.biddings[i].statusWin) {
          //   let updateData = {
          //     alreadyWin : true,
          //     alreadyEmail :false
          //   }
          //   data.biddings.forEach(data=>{
          //     
          //   })
          //   let id = data.biddings[0].id
          //   Models.bidding
          //   .update(updateData,
          //     {where : {id : id}})
          //     .then((result)=>{
          //     })
          //     Models.User.findById(tempUserId).then(user=>{
          //       
          //   })
          // }
        }
        
      }
      
    });
    
  })
}

module.exports = cekEmail;