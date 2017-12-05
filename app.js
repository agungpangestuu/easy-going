const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('views', './views')
app.set('view engine', 'ejs')

const Mobil = require('./routers/mobil');
app.use('/mobil', Mobil)


app.listen(3000, function () {
  console.log('Jalan Cuy!');
})