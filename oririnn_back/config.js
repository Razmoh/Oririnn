const mysql = require('mysql2');
// require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

const con = mysql.createConnection({
   host: "localhost",
   user: "benjamin",
   password: "123456",
   database : "oririnn",
 });

module.exports = con;