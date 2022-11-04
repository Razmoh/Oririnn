var express = require("express");
var router = express.Router();
var con = require("../config");
const bcrypt = require("bcrypt");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const Authentication = require("../services/service_auth");
const middleware = require('../middleware/auth.middleware')

router.post("/register", async function (req, res) {
  console.log(req.body)
  if (
    !req.body.firstname && !req.body.lastname && !req.body.password && !req.body.email
  ) {
    return res.status(400).json({
      message: "Error. Please enter firstname, lastname, email and password",
    });
  } else if (
    req.body.firstname == "" || req.body.lastname == "" || req.body.password == "" || req.body.email == ""
  ) {
    return res.status(400).json({
      message: "Error. Please enter firstname, lastname, email and password",
    });
  }

  const user = await req.body;
  con.query(
    `SELECT * from users WHERE email= '${user.email}'`,
    async function (err, rows, fields) {
      if (rows[0]) {
        return res.status(400).json({ message: "user already exist" });
      }
    }
  );

  const result = await Authentication.register(req.body);
  return res.status(200).json(result);
});

router.post("/login", async function (req, res) {
  const user = await req.body;
  con.query(
    `SELECT * from users WHERE email= '${user.email}'`,
    async function (err, rows, fields) {
      if (!rows[0]) {
        return res.status(400).json({ message: "Invalid Auth Details" });
      }
    }
  );
  const result = await Authentication.login(req.body);
  return res.status(200).json(result);
});

module.exports = router;
