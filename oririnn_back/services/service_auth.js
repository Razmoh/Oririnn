// require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
var express = require("express");
var router = express.Router();
var con = require("../config");
const bcrypt = require("bcrypt");
const SECRET = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

async function register(body) {
    var date = new Date().toLocaleDateString("en-GB");
    const saltRounds = 10;
    const password = await bcrypt.hash(body.password, saltRounds);
        const [rows1, field1, error] = await con.promise().execute('INSERT INTO users(`firstname`, `lastname`, `email`, `password`, `phone`, `creation_date`, `age`) VALUES(?, ?, ?, ?, ?, ?, ?)', [body.firstname, body.lastname, body.email, password, body.phone, date, body.age]);
        const [rows2, field2] = await con.promise().execute('SELECT * from users WHERE email= ?', [body.email]);
        return rows2[0];
    }
    
    async function login(body) {
 
        const [rows, field] = await con.promise().execute('SELECT * from users WHERE email= ?', [body.email]);
        const email = await rows[0].email;
        const password = await rows[0].password;
        const verifyPassword = await bcrypt.compare(body.password, password);
        const token = jwt.sign(
            {
                id: rows[0].id,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                admin: rows[0].admin,
            },
            SECRET,
            { expiresIn: "24 hours" }
            );
            
            if (email === body.email && verifyPassword) {
                return { AcessToken: token };
            } else {
                return "Invalid Auth Details"
            }
        }
               
        module.exports = {
            register, login
        };
        