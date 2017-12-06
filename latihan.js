// function addMinutes(date,minutes){
//   return new Date (date.getTime() + minutes * 60000)
// }
// 
let tanggalLama = '2017-12-06 10:41:04.598+07'
// 
// console.log(addMinutes(new Date(tanggalLama),60*));

// var newDateObj = new Date();
// newDateObj.setTime(new Date(tanggalLama).getTime() + (30 * 60 * 1000));
// 
// console.log(newDateObj);

let tanggalBaru = new Date().getTime();
let tanggalLamaDate = new Date(tanggalLama).getTime()
console.log(new Date(tanggalBaru-tanggalLamaDate).getMinutes())