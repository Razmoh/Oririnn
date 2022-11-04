var express = require('express');
var router = express.Router();
var offer = require("../services/service_validate");
const con = require("../config");
const middleware = require('../middleware/auth.middleware')

router.get('/', async function (req, res) {

  const verify = middleware.verifyToken(req.headers.authorization)
  if (verify === "Invalid token") {
    return res.status(401).json("Unauthorized")
  }

  const admin = middleware.admin(req.headers.authorization)
  if (admin === "Forbidden") {
    return res.status(403).json("Forbidden")
  }

  const getWait = await offer.getWait()
  return await res.status(200).json(getWait)


})

router.put('/:id', async function (req, res) {

  const verify = middleware.verifyToken(req.headers.authorization)
  if (verify === "Invalid token") {
    return res.status(401).json("Unauthorized")
  }

  const admin = middleware.admin(req.headers.authorization)
  if (admin === "Forbidden") {
    return res.status(403).json("Forbidden")
  }

  const body = await con.promise().execute(`UPDATE offers SET approval = 1 WHERE id= ?`, [req.params.id])
  return await res.status(200).json(body)
})

module.exports = router;