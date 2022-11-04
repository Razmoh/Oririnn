const route_auth = require("./route_auth");
const route_user = require('./route_user')
const route_booking = require ('./route_booking.js')
const route_offer = require('./route_offer')
const route_search = require('./route_search')
const route_fav = require('./route_fav')
const  route_validate = require('./route_validate')
const route_image = require('./route_image')
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("index");
});

router.use('/user', route_user);
router.use('/auth', route_auth);
router.use('/booking', route_booking);
router.use('/user', route_user)
router.use('/offer', route_offer)
router.use('/auth', route_auth)
router.use('/favorites', route_fav)
router.use('/search', route_search)
router.use('/validate', route_validate)
router.use('/image', route_image)

module.exports = router;
