const express=require('express');

const router=express.Router();
const followings=require('../Controllers/following');

router.post('/', followings.following);
router.post('/addFriend',followings.addFriend);
router.post('/delFriend',followings.delFriend);




module.exports=router;