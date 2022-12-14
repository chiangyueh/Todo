const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const methodOverride = require('method-override') 
const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended : true}));
app.use(methodOverride('_method'))
app.use(routes)




app.listen(port, () => {
    console.log(`This project is now running on localhost:${port}`)
})