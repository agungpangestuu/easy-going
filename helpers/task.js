const Models = require('../models');
function taskAutoUpdate() {
  Models.Mobil.findAll().then(dataMobil=>{
    
    dataMobil.forEach(data=>{
      let date = new Date(data.createdAt)
      let timeleft = new Date(date.setMinutes(date.getMinutes() + data.time))
      if (data.status && new Date() >= timeleft){
        let updateData = {
          status :false
        }
        Models.Mobil
        .update(updateData,
          {where : {id : data.id}})
        .then((result)=>{
        })
      }
    })
    console.log('running a task every minute');
  })
  Models.Mobil.findAll({include :[Models.bidding]}).then(dataBidding=>{
    
  })
  
}
module.exports = taskAutoUpdate;