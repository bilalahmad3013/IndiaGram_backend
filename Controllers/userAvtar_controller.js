const userAvtar = require('../models/userAvtar');
const BASE_URL = process.env.BASE_URL;
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

module.exports.userAvtar = async function (req, res) {

  try {
    const avtarURL = `/uploads/profilePic/${req.file.filename}`;

    const updatedUser = await userAvtar.findOne({ email: req.body.userEmail });
    if (updatedUser) {
      if (updatedUser.photo) {
        const oldPhotoPath = path.join(__dirname, '..', 'uploads', 'profilePic', path.basename(updatedUser.photo));
        // Check if the file exists before attempting to delete
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      let resp = await userAvtar.findOneAndUpdate({ email: req.body.userEmail }, { photo: avtarURL });
      if (!resp) {
        return res.json({ status: false });
      }

      await User.findOneAndUpdate({ email: req.body.userEmail }, { pic: avtarURL });

      return res.json({ status: true, msg: "Profile updated successfully" });
    } else {
      let resp = await userAvtar.create({
        email: req.body.userEmail,
        photo: avtarURL
      });
      await User.findOneAndUpdate({ email: req.body.userEmail }, { pic: avtarURL });
      if (!resp) {
        return res.json({ status: false });
      }

      return res.json({ status: true, msg: "Profile created successfully" });
    }

  } catch (error) {
    console.error(error);
    return res.json({ status: false });
  }
};

module.exports.getAvtar =async function (req, res) { 
  try {
    console.log(req.body);
    const updatedUser=await userAvtar.findOne({email:req.body.userEmail});    

    if(updatedUser){
      let url=BASE_URL+updatedUser.photo
     
      res.json({status:true, picURL:url});
    
    }
    else{   
      res.json({status:true, msg:"use default"})
    }
  
    
  } catch (error) {
    console.log(error);
    res.json({status:false, msg:error});
  }
  

}