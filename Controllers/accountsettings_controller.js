const Profile =require('../models/profile');

module.exports.setting = async (req,res)=>{

console.log(req.body);
try {
    let profile=await Profile.findOne({userEmail:req.body.useremail})

    if(profile){
        await Profile.findOneAndUpdate(
            { userEmail: req.body.useremail },
            {
              fullname: req.body.fullname,
              dob: req.body.dob,
              private: req.body.private,
              contactinfo: req.body.contactinfo,
              bio: req.body.bio
            }
          );
    
          return res.status(200).json({ message: 'Profile updated successfully.' });
       
    }
    else{
    const newProfile =await Profile.create({
        userEmail: req.body.useremail,
        fullname: req.body.fullname,
        dob: req.body.dob,
        private: req.body.private,
        contactinfo: req.body.contactinfo,
        bio: req.body.bio
    })
    return res.status(201).json({ message: 'Profile created successfully.' });
}
}

  
catch (error) {
    console.error(error);
      res.status(500).json({ success: false, error: "Failed to update profile" });
}

}

module.exports.getSettings= async (req,res)=>{
  
  
 let profile = await Profile.findOne({userEmail:req.body.userEmail});


 if(profile){
  
    return res.status(200).json(profile);
 }
 else{
    return res.status(200).json("Profile not found");
 }
}