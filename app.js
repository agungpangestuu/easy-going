
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routers/user')
const mobilRouter = require('./routers/mobil')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('views','./views')
app.set('view engine','ejs')


app.get('/', function (req, res) {
 res.send('‘Hello World!’');
})


app.use('/users',userRouter)
app.use('/mobil',mobilRouter)





app.listen(3000, function () {
 console.log('IT WORKS!');
})
