var express = require("express");
var router = express.Router();
var con = require("../config");


async function postBooking(body) {
    const [rows1, field1, err] = await con.promise().execute('INSERT INTO bookings(`offer_id`, `user_id`, `dates_start`, `dates_end`) VALUES(?, ?, ?, ?)', [body.offer_id, body.user_id, body.dates_start, body.dates_end])
    const [rows2, field2,] = await con.promise().execute('SELECT * from bookings WHERE id= ?', [rows1.insertId])
    return rows2[0]
}

async function getBooking(id) {
    const [rows1, field1] = await con.promise().execute('SELECT * from bookings WHERE user_id = ?', [id])
    if (rows1[0]) {
        const [rows2, field2] = await con.promise().execute('SELECT user_id, title, address, postcode, city from offers WHERE id = ?', [rows1[0].offer_id])
        const [rows3, field3] = await con.promise().execute('SELECT firstname, lastname, email, phone from users WHERE id = ?', [rows1[0].user_id])
        const result = { bookings: rows1[0], offers: rows2[0], users: rows3[0] }
        return result;
    }
    else
    return "No booking for user_id="+id
    
}

module.exports = {
    postBooking, getBooking
};