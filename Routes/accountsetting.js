const express=require('express');

const router=express.Router();
const account=require('../Controllers/accountsettings_controller');

router.post('/', account.setting);
router.post('/getSetting', account.getSettings);



module.exports=router;