const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
app.use(express.urlencoded({ extended : true}));
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 引用路由器
const routes = require('./routes')


const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// 載入 method-override
const methodOverride = require('method-override') 
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)
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

app.listen(port, () => {
    console.log(`This project is now running on localhost:${port}`)
})