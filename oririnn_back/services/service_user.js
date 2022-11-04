const fetch = require("node-fetch");
var con = require("../config");
const bcrypt = require('bcrypt');
const date = new Date().toLocaleDateString("en-GB");
const currentDate = new Date()

//User Profile
async function getUser(id) {
    let days;
    let months;
    let years;
    let pastDate;

    const offer = []
    const currentOffers = []
    const pastOffers=[]

    const [rows1, field1] = await con.promise().execute('SELECT * from users WHERE id = ?', [id])

    if (rows1[0] === undefined) {
        return "Bad request"
    }

    const [rows2, field2] = await con.promise().execute('SELECT * from bookings WHERE user_id = ?', [id])

    for (const key in rows2) {
        const [rows3, field3] = await con.promise().execute('SELECT id, city, title, images from offers WHERE id = ?', [rows2[key].offer_id])
        const [rows4, field4] = await con.promise().execute('SELECT * from favorites WHERE user_id = ?', [rows2[key].id])

        if(rows4[0] !== undefined){
            if(rows3[0].id === rows4[0].offer_id) {
                rows2[key].favorites = true
            }
            else {
                rows2[key].favorites = false
            }
        }
        else {
            rows2[key].favorites = false
        }
        
        rows2[key].city = rows3[0].city
        rows2[key].title = rows3[0].title
        rows2[key].images = rows3[0].images

        days = rows2[key].dates_end.slice(0, -8)
        months = rows2[key].dates_end.slice(3, -5)
        years = rows2[key].dates_end.slice(6)
        
        pastDate = new Date(`${months}/${days}/${years}`)

        if (pastDate.getTime() >= currentDate.getTime()) {
            currentOffers.push(rows2[key])
        }
        if (pastDate.getTime() < currentDate.getTime()) {
            pastOffers.push(rows2[key])
        }
    }

    const [rows, field] = await con.promise().execute('SELECT * FROM offers ORDER BY creation_date DESC')
    const [rows5, field5] = await con.promise().execute('SELECT * FROM favorites where user_id = ?', [id])

    for (const key in rows) {

        const findFav = rows5.find(element => element.offer_id === rows[key].id)
        if (findFav !== undefined) {
            if (findFav.offer_id === rows[key].id) {
                rows[key].favorite = true
                offer.push(rows[key])
            }             
        }
    }

    const result = {user: rows1[0], bookings: currentOffers, pastBookings: pastOffers, favorites: offer}
    return result
}

//ADMIN Page
async function getUsers() {
    const [rows, field] = await con.promise().execute('SELECT * FROM users')
    if (rows[0] === undefined) {
        return "Bad request"
    }

    return rows
}

async function postUser(body) {
    const saltRounds = 10;
    const password = await bcrypt.hash(body.password, saltRounds)
    con.execute('INSERT INTO users (`firstname`, `lastname`, `email`, `password`, `age`, `admin`, `creation_date`) VALUES (?, ?, ? ,?, ?, ?, ?)',
    [body.firstname, body.lastname, body.email, password, body.age, body.admin, date],
    async function (err, rows, fields) {})
    const [rows, field] = await con.promise().execute('SELECT * from users WHERE email= ?', [body.email])
    return rows[0]
    
}

async function updateUser(body, id) {
    for (const property in body) {
        con.execute(`UPDATE users SET ${property}= ? where id= ?`, [body[property], id])
    }
    const [rows, field] = await con.promise().execute('SELECT * from users WHERE id = ?', [id])
    return rows[0]
}
module.exports = { getUsers, postUser, updateUser, getUser };
