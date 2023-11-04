const express=require('express');

const router=express.Router();
const followers=require('../Controllers/followers');

router.post('/', followers.followers);
router.post('/addFriend', followers.addFriend);
router.post('/delFriend', followers.delFriend);




module.exports=router;