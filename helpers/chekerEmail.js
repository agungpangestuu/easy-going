const Models = require('../models');
const Mail = require('../helpers/mail')

function cekEmail() {
  Models.bidding.findAll({order: [ [ 'bid' ,'ASC'] ]}).then(dataBidding=>{
    
    let tempBid = 0
    let tempUserId = null
    dataBidding.forEach(data => {
      Models.Mobil.findById(data.MobilId).then((err,row)=>{
        if (!row.status && data.statusWin == true && data.alreadyEmail == false) {
          let updateData = {
            alreadyEmail :true
          }
          let id = data.id
          Models.User
          .findById(data.UserId)
          .then((err,result)=>{
            Mail(result.email)
          })
          Models.Mobil
          .findById(data.MobilId)
          .then((err,mobil)=>{
            Models.User
            .findById(mobil.UserId)
            .then((err,user)=>{
              Mail(user.email)
            })
          })
          Models.bidding
          .update(updateData,
            {where : {id : id}})
            .then((result)=>{
            })
      
        }
      })
      
    });
    
  })
}

cekEmail()

module.exports = cekEmail;