const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const Home = require('./routers/index');
const userRouter = require('./routers/user');
const mobilRouter = require('./routers/mobil');
const Models = require('./models');


const cron = require('node-cron');
 //buat jalanin otomatis sebuat task
cron.schedule('* * * * *', function(){
  Models.Mobil.findAll().then(dataMobil=>{
    dataMobil.forEach(data=>{
      let date = new Date().getMinutes()
      let timeleft = data.createdAt.getMinutes() + data.time
      if (date >= timeleft){
        data.status = false
        Models.Mobil.update(data,{where : {id : data.id}}).then()
        console.log(dataMobil);
      }
    })
    console.log('running a task every minute');
  })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use session-express 
app.use(session({
  secret: 'easy-going'
}))

app.set('views','./views');
app.set('view engine','ejs');


// app.get('/', function (req, res) {
//  res.send('‘Hello World!’');
// })

app.use('/',Home);
app.use('/users',userRouter);
app.use('/mobil',mobilRouter);





app.listen(3000, function () {
 console.log('IT WORKS!');
})
