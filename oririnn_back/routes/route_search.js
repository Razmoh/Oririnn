var express = require('express');
var router = express.Router();
const con = require("../config");
const research = require('../services/service_search');

router.get('/', async function (req, res){
    const search = await research.getSearch(req.query)
    return res.status(200).json(search)
})

module.exports = router;