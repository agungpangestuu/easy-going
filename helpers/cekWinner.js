function cekWinner() {
  Models.Mobil.findAll({include :[Models.bidding],order: [ [ Models.bidding, 'bid' ,'DESC'] ]}).then(dataBidding=>{
    res.send(dataBidding)
    let tempBid = 0
    let tempUserId = null
    dataBidding.forEach(data => {
      if (!dataBidding.status && data.biddings.length == 1) {
        let updateData = {
          alreadyEmail :false
        }
        Models.Mobil
        .update(updateData,
          {where : {id : data.biddings.id}})
        .then((result)=>{
        })
        // data.biddings[0].alreadyEmail = true
      }
      // else if (data.biddings.length > 1) {
      //     if (biddings.bid > tempBid) {
      //       tempBid = biddings.bid
      //       tempUserId = biddings.UserId
      //     }
      //   Models.User.findById(tempUserId).then(user=>{
      //     
      //   })
      // }
        
    });
    
  })
}

module.exports = cekWinner;