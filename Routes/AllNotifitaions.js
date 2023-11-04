const express=require('express');
const AllNotifications= require('../models/AllNotifications');
const User = require('../models/user');


const router=express.Router();


router.post('/', async (req, res) => {
    let email = req.body.email;
    let user = await AllNotifications.findOne({ email: email });
    let arr = [];
    if(user){
    for (let i = 0; i < user.NotificationArray.length; i++) {
        var currUser = user.NotificationArray[i];
        let search = await User.findOne({ email: currUser.sender });

        if (search) {
            let mergedObj = {
                ...search.toObject(),
                ...currUser,
            };

            arr.push(mergedObj);
        }
    }
}
    if (user) {
        return res.status(200).json({ NotificationArray: arr });
    }
    return res.status(200).json({ NotificationArray: [] });
});

router.post('/createNotification', async (req,res)=>{
    let email=req.body.email;
    let user=await AllNotifications.findOne({email:email});

    if(user){
        await AllNotifications.findOneAndUpdate({email:email},{$push :{ NotificationArray:req.body.obj}})
        return res.status(200).json({length:user.NotificationArray.length});
    }
    else{
       await AllNotifications.create({
        email:email,
        NotificationArray:req.body.obj
       })
       return res.status(200).json({length:1});
    }

})

router.post('/deleteNotifications', async (req, res) => {
    let email=req.body.email;
    let user=await AllNotifications.findOne({email:email});

    if(user){
       await AllNotifications.deleteMany({email:email});
       return res.status(200).json({msg:"Deleted Successfully"});
    }
    return res.status(200).json({msg:"Already"});
});





module.exports=router;