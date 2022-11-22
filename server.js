// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
//   }
  
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const mongoose = require("mongoose")
  const dotenv = require("dotenv")
  const bodyParser = require('body-parser')
//   const methodOverride = require('method-override')
  
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')   //inside the layout folder
  app.use(expressLayouts)
  //app.use(methodOverride('_method'))
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
  dotenv.config()

mongoose
.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));
  
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
  
app.listen(process.env.PORT || 8000)