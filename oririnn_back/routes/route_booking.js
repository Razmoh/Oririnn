var express = require('express');
var router = express.Router();
var con = require("../config");
const booking = require ("../services/service_booking");
const middleware = require('../middleware/auth.middleware')

router.post("/", async function (req, res) {

    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }

    if (req.body.offer_id && req.body.user_id && req.body.dates_start && req.body.dates_end) {
        const post = await booking.postBooking(req.body)
        return res.status(200).json(post)
    }
});

router.get('/:id', async function (req, res){
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }
    
    const getOne = await booking.getBooking(req.params.id)
    return res.status(200).json(getOne)
})

router.delete('/:id', async function (req, res) {
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }
    
    const [rows, field] = await con.promise().execute('DELETE FROM bookings WHERE id = ?', [req.params.id])
    return res.status(200).json("booking deleted")
})

module.exports = router;