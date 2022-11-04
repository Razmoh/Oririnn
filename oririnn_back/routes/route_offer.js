var express = require('express');
var router = express.Router();
const con = require("../config");
const offer = require('../services/service_offer')
const middleware = require('../middleware/auth.middleware')

// CRUD OFFERS----------------------------------------------------

router.get('/', async function (req, res){
    let param = ""
    if (req.query.user_id) {
        param = req.query.user_id
    }
    const get = await offer.getOffers(param)
    return res.status(200).json(get)
})

router.get('/owner', async function (req, res){
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }
    if (!req.query.user_id) {
        return res.status(400).json("Bad request")
    }
    const getOwner = await offer.getOffersOwner(req.query.user_id)
    if (getOwner === "Bad request") {
        return res.status(400).json("Bad request")
    }

    return res.status(200).json(getOwner)
})

router.get('/:id', async function (req, res){
    let param = ""
    if (req.query.user_id) {
        param = req.query.user_id
    }
    const getOne = await offer.getOffer(param, req.params.id)
    return res.status(200).json(getOne)
})

router.post('/', async function (req, res){
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }

    const post = await offer.postOffer(req.body)
    return res.status(200).json(post)
})


router.put('/:id', async function (req, res){
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }
    
    const update = await offer.updateOffer(req.body, req.params.id)
    return res.status(200).json(update)
})

router.delete('/:id', async function (req, res) {
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }
    const [rows, field, err] = await con.promise().execute('DELETE FROM offers WHERE id = ?', [req.params.id])
    if (err) console.log(err)
    return res.status(200).json(rows)
})

module.exports = router;
