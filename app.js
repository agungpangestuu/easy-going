const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const Home = require('./routers/index');
const userRouter = require('./routers/user');
const mobilRouter = require('./routers/mobil');
const profileRouter = require('./routers/profile');
const task = require('./helpers/task');


const cron = require('node-cron');
 //buat jalanin otomatis sebuat task
cron.schedule('* * * * *', function(){
  task()
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('assets/css'))

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
app.use('/profile',profileRouter)
app.use('/users',userRouter);
app.use('/mobil',mobilRouter);





app.listen(3000, function () {
 console.log('IT WORKS!');
})
