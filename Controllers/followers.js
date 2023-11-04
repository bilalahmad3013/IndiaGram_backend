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

module.exports.addFriend = async (req,res)=>{
    let email=req.body.email;

    let user= await followSchema.findOne({email:email});
    if(!user){
      await followSchema.create({
        email:email,
        followers:[req.body.requestedUser]
      })
      res.status(200).json({msg:"added successfully"})
    }
    else{
      await followSchema.findOneAndUpdate({email:email},{$push:{followers:req.body.requestedUser}})
      res.status(200).json({msg:"updated successfully"})
    }
    
}

module.exports.delFriend = async (req, res) => {
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
    res.status(404).json({ msg: "hai hi nhi to del kya kre" });
  }
}
