const express=require('express');

const router=express.Router();
const homeController=require('../Controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/accountsetting', require('./accountsetting'));
router.use('/userAvtar', require('./userAvtar'));
router.use('/posts',require('./posts'));
router.use('/followers', require('./followers'));
router.use('/following', require('./followings'));
router.use('/Notifications', require('./AllNotifitaions'));
router.use('/comments',require('./comments'));


module.exports=router;