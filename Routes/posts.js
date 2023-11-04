const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const post = require('../Controllers/posts_controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/posts'));
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('media'), post.postsController);
router.post('/getPost' , post.getPosts);

module.exports = router;
