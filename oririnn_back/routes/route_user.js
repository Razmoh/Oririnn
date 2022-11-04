var express = require('express');
var router = express.Router();
var con = require("../config");
const user = require("../services/service_user");
const middleware = require('../middleware/auth.middleware')

router.get('/:id', async function (req, res){

  const verify = middleware.verifyToken(req.headers.authorization)
  if (verify === "Invalid token"){
    return res.status(401).json("Unauthorized")
  }
  
  const getOne = await user.getUser(req.params.id)
  if (getOne === "Bad request"){
    return res.status(400).json(getOne)
  }
  return res.status(200).json(getOne)
})

router.get('/', async function (req, res){

  const verify = middleware.verifyToken(req.headers.authorization)
  if (verify === "Invalid token"){
    return res.status(401).json("Unauthorized")
  }

  const admin = middleware.admin(req.headers.authorization) 
  if (admin === "Forbidden") {
    return res.status(403).json("Forbidden")
  }

  const getAll = await user.getUsers()
  if (getAll === "Bad request") {
    return res.status(400).json(getAll)
  }
  return res.status(200).json(getAll)
})

router.post('/', async function (req, res){

  const verify = middleware.verifyToken(req.headers.authorization)
  if (verify === "Invalid token"){
    return res.status(401).json("Unauthorized")
  }

  const admin = middleware.admin(req.headers.authorization) 
  if (admin === "Forbidden") {
    return res.status(403).json("Forbidden")
  }

  if (!req.body.firstname && !req.body.lastname && !req.body.email && !req.body.password) {
    return res.status(400).json({ message: 'Error. Please enter firstname, lastname, email and password' })
  }
  else if (req.body.firstname == "" || req.body.lastname == "" || req.body.password == "" || req.body.email == "") {
    return res.status(400).json({ message: 'Error. Please enter firstname, lastname, email and password' })
  }
  const [rows, field] = await con.promise().execute('SELECT * from users WHERE email= ?', [req.body.email])
  if (rows[0]) {
    return res.status(400).json({ message: 'user already exist' }) 
  }
  const post = await user.postUser(req.body)
  return res.status(200).json(post)
})

router.delete('/:id', async function (req, res) {

  const verify = middleware.verifyToken(req.headers.authorization)
  if (verify === "Invalid token"){
    return res.status(401).json("Unauthorized")
  }

  const admin = middleware.admin(req.headers.authorization) 
  const userVerify = middleware.userRights(req.headers.authorization, req.params.id)
  if (userVerify === "Forbidden" && admin === "Forbidden") {
      return res.status(403).json("Forbidden")
  }

  const [rows, field] = await con.promise().execute('DELETE FROM users WHERE id = ?', [req.params.id])
  if (rows.affectedRows === 0) {
    return res.status(400).json("Bad Request")
  }
  return res.status(200).json("User deleted")
})

router.put('/:id', async function (req, res) {
  const verify = middleware.verifyToken(req.headers.authorization)

  if (verify === "Invalid token"){
    return res.status(401).json("Unauthorized")
  }
  const admin = middleware.admin(req.headers.authorization) 
  const userVerify = middleware.userRights(req.headers.authorization, req.params.id)
  if (userVerify === "Forbidden" && admin === "Forbidden") {
      return res.status(403).json("Forbidden")
  }

  const id = req.params.id
  const [rows, field] = await con.promise().execute('SELECT * from users WHERE id = ?', [id])
  if (rows[0] == undefined) {
    return res.status(400).json({ message: 'user does not exist' }) 
  }
  const update = await user.updateUser(req.body, req.params.id)
  return res.status(200).json(update)
})



module.exports = router;
