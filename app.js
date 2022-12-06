const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })//設定連線到MONGODB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index')
  })

app.listen(port,()=>{
    console.log(`This project is now running on localhost:${port}`)
})