const express=require('express');

const router=express.Router();
const comment=require('../Controllers/comments_controller');

router.post('/getComments', comment.getComments)
router.post('/addComment', comment.addComment);
router.post('/deleteComment', comment.delelteComment);



module.exports=router;