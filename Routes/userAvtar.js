const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const avtar = require('../Controllers/userAvtar_controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/profilePic'));
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('pic'), avtar.userAvtar);
router.post('/getAvtar' , avtar.getAvtar);

module.exports = router;
