const Models = require('../models');
function taskAutoUpdate() {
  Models.Mobil.findAll().then(dataMobil=>{
    
    dataMobil.forEach(data=>{
      console.log(data);
      let date = new Date(data.createdAt)
      let timeleft = new Date(date.setMinutes(date.getMinutes() + data.time))
      if (data.status && new Date() >= timeleft){
        console.log("MASUK IF");
        let updateData = {
          status :false
        }
        Models.Mobil
        .update(updateData,
          {where : {id : data.id}})
        .then((result)=>{
          console.log(result);
        })
      }
    })
    console.log('running a task every minute');
  })
}
module.exports = taskAutoUpdate;