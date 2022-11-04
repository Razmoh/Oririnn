require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var con = require("./config");
const port = 8000;

var indexRouter = require('./routes/index');


var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(port,  () => {
  console.log(`listening on port ${port}`); 
});

app.use('/static', express.static('public'))
app.use('/', indexRouter);

con.connect()


module.exports = app;
