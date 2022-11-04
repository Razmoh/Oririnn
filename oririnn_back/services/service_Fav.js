var express = require('express');

var app = express();
const port = 8000;
const router = express.Router();
const con = require('../config.js')


async function Postfav(offer_id, user_id){
    const [rows, field] = await con.promise().query("INSERT INTO favorites (offer_id, user_id) VALUES(?,?)", [offer_id, user_id]);
    return rows
} 



async function deletefav(offer_id, user_id) {
    const [rows, field] = await con.promise().execute("DELETE FROM favorites WHERE user_id= ? AND offer_id= ?", [user_id, offer_id])
    return rows
}

module.exports = {
    Postfav, deletefav
  }