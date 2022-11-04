var con = require("../config");
const date = new Date().toLocaleDateString("en-GB");

async function postOffer(body) {
    const [rows, field] = await con.promise().execute('INSERT INTO offers (`user_id`, `title`, `description`, `images`, `dates_start`, `dates_end`, `capacity`, `price`, `address`, `postcode`, `city`, `creation_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [body.offers.user_id, body.offers.title, body.offers.description, body.offers.images, body.offers.dates_start, body.offers.dates_end, body.offers.capacity, body.offers.price, body.offers.address, body.offers.postcode, body.offers.city, date])
    .catch(err => {
        console.log("erreur", err)
    })
    const [rows2, field2] = await con.promise()
    .execute("INSERT INTO options (`offer_id`, `piscine`, `jacuzzi`, `barbecue`, `wifi`, `climatisation`, `chauffage`, `lave`, `seche`, `cuisine`, `workspace`, `television`, `chambres`, `lits`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [rows.insertId, body.options.piscine, body.options.jacuzzi, body.options.barbecue, body.options.wifi, body.options.climatisation, body.options.chauffage, body.options.lave, body.options.seche, body.options.cuisine, body.options.workspace, body.options.television, body.options.chambres, body.options.lits])

    // const [rows3, field3] = await con.promise().execute('SELECT * FROM offers WHERE id = ?', [rows.insertId])
    // return rows3[0]
    return rows.insertId
}

async function getOffers(param) {
    const offer = []
    const [rows, field] = await con.promise().execute('SELECT * FROM offers WHERE approval = 1 ORDER BY creation_date DESC')
    if (param === "") {
        for (const index in rows) {
            rows[index].favorite = false
        }
        return rows
    }
    else {
        const [rows1, field1] = await con.promise().execute('SELECT * FROM favorites where user_id = ?', [param])
        
        for (const key in rows) {

            const findFav = rows1.find(element => element.offer_id === rows[key].id)
            if (findFav !== undefined) {
                if (findFav.offer_id === rows[key].id) {
                    rows[key].favorite = true
                    offer.push(rows[key])
                }             
            }
            else {
                rows[key].favorite = false
                offer.push(rows[key])
            }
        }
        
        return offer
    } 
}

async function getOffersOwner(user_id) {

    const [rows, field] = await con.promise().execute("SELECT * FROM offers WHERE user_id = ? ORDER BY creation_date DESC", [user_id])

    if (rows[0] === undefined) {
        return "No offer found"
    }
    for (const key in rows) {
        const [rows1, field1] = await con.promise().execute("SELECT * FROM bookings WHERE offer_id = ?", [rows[key].id])
        if (rows1[0] !== undefined) {
            if (rows1[0].offer_id === rows[key].id) {
                rows[key].bookings = rows1
            }
        } 
        else {
            rows[key].bookings = rows1   
        }     
    }

    return rows
}

async function getOffer(user_id, id) {

    const [rows, field] = await con.promise().execute('SELECT * FROM offers where id = ?', [id])
    const [rows2, field2] = await con.promise().execute('SELECT * FROM options where offer_id = ?', [id])
    const [rows3, field3] = await con.promise().execute('SELECT * FROM bookings where offer_id = ?', [id])

    if (!rows[0]) {
        return "This offer doesn't exist"
    }

    if (user_id !== "") {
        const [rows1, field1] = await con.promise().execute('SELECT * FROM favorites where user_id = ? AND offer_id = ?', [user_id, id])
        if (rows1[0]) 
            { rows[0].favorite = true }
        else
            { rows[0].favorite = false }
    }

    rows[0].options = rows2[0]
    rows[0].bookings = rows3
    return rows[0]
}

async function updateOffer(body, id) {
    for (const property in body) {
        con.execute(`UPDATE offers SET ${property} = ? where id= ?`, [body[property], id])
    }
    return "Offer updated !"
}

module.exports = { postOffer, getOffers, updateOffer, getOffer, getOffersOwner }