const express = require('express');
const multer = require('multer')
const fs = require('fs-extra')
var router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let Id = req.params.id
    fs.mkdirsSync('./public/images/' + Id);
    cb(null, './public/images/' + Id)
  },
  filename: function (req, file, cb) {
    let newFileName = file.fieldname + ".jpg"
    cb(null, newFileName)
  }
})
const upload = multer({ storage: storage });

router.post('/:id', upload.any(), (req, res) => {
  res.sendStatus(200)
})

module.exports = router;