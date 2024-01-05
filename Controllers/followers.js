const followSchema =require('../models/followers');

module.exports.followers= async function(req,res){
    let email=req.body.email;

    let user= await followSchema.findOne({email:email});
    if(!user){
      res.status(200).json({msg:"No followers"})
      return;
    }
    res.status(200).json({followers: user.followers});
  }

  module.exports.addFriend = async (req, res) => {
    let email = req.body.email;   
  
    let user = await followSchema.findOne({ email: email });
  
    if (!user) {
      await followSchema.create({
        email: email,
        followers: [req.body.requestedUser]
      });
      res.status(200).json({ msg: "is now your follower" });
    } else {      
      if (!user.followers.includes(req.body.requestedUser)) {
        await followSchema.findOneAndUpdate(
          { email: email },
          { $push: { followers: req.body.requestedUser } }
        );
        res.status(200).json({ msg: "is now your follower" });
      } else {
        res.status(200).json({ msg: "is already in followers your list" });
      }
    }
  };
  

  module.exports.delFriend = async (req, res) => {
    try {
      let email = req.body.email;
      let requestedUser = req.body.requestedUser;
      let user = await followSchema.findOne({ email: email });
  
      if (user) {
        await followSchema.updateOne(
          { email: email },
          { $pull: { followers: requestedUser } }
        );
  
        res.status(200).json({ msg: "Deleted successfully" });
      } else {
        res.status(404).json({ msg: "User not found, unable to delete" });
      }
    } catch (err) {
      res.status(500).json({ msg: "Error occurred while deleting friend" });
    }
  };
  
