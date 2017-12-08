const Models = require('../models');
function cekWinner() {
  Models.Mobil.findAll({include :[Models.bidding],order: [ [ Models.bidding, 'bid' ,'DESC'] ]}).then(dataBidding=>{
    // res.send(dataBid
    let tempBid = 0
    let tempUserId = null
    dataBidding.forEach(data => {
      if (!dataBidding.status && data.biddings.length == 1) {
        let updateData = {
          statusWin : true,
          alreadyEmail :false
        }
        Models.bidding
        .update(updateData,
          {where : {id : data.biddings[0].id}})
        .then((result)=>{
        })
      }
      else if (!dataBidding.status && data.biddings.length > 1) {
        for (let i = 0; i < data.biddings.length; i++) {
          if (i == 0 && data.biddings[i].statusWin == null) {
            let id = data.biddings[i].id
            Models.bidding
            .update({
              statusWin : true,
              alreadyEmail :false
            },
              {where : {id : id}})
              .then((result)=>{
            })
          }else if (i != 0 && data.biddings[i].statusWin == null) {
            let id = data.biddings[i].id
            Models.bidding
            .update({
              statusWin : false
            },
              {where : {id : id}})
              .then((result)=>{
            })
          }
        }
        // 
        // Models.User.findById(tempUserId).then(user=>{
        //   
        // })
      }
      
    });
    
  })
}

module.exports = cekWinner;