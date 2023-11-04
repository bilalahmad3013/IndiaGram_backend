const express = require('express');
const User = require('../models/user');
const {validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtSecret="fdbfdnbfddsvsdvvdvdvsvvsvddsbsfbfdbd"




module.exports.signUp = async (req,res)=>{    
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(500).send({ errors: result.array() });
    }
    if(req.body.password!==req.body.ConfirmPassword){
        return res.status(500).send("Password not matches");
    } 
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    
  
    const existingUserEmail = await User.findOne({ email: req.body.email });
    const existingUserName =  await User.findOne({name: req.body.name});
    if (existingUserEmail || existingUserName) {
      return res.status(400).json({ error: "User with this email or username already exists" });
    }  try {
       
      const newUser = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      
      });
  
      res.json({ success: true, user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to create user" });
    }
}

module.exports.signIn = async (req,res)=>{
    let email = req.body.email;
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(500).send({ errors: result.array() });
    }
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ error: "Invalid userid or password" });
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userdata.password);
      if (!pwdCompare) {
        return res.status(400).json({ error: "Invalid userid or password" });
      }
      const data={
        user:{
          id:userdata.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken})
    }
    catch (error) {
      console.log(error);
      res.json({ success: false });
    }
}



module.exports.giveUsers = async (req, res) => {
  const str = req.body.string;
  const userEmail = req.body.userEmail;

  try {
    const escapedStr = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedStr, "i");
    
    const userArr = await User.find(
      { name: regex, email: { $ne: userEmail } },
      { name: 1, email: 1, pic: 1 }
    );
    
    return res.json({ success: true, users: userArr });
  } catch (error) {
    console.log("Error:", error);
    res.json({ success: false });
  }
};

module.exports.getUser = async (req, res)=>{
try {
  
  let user;
  if(req.body.userEmail!==undefined){
  user=await User.findOne({email:req.body.userEmail});
  }
  else{
    user=await User.findOne({name:req.body.name});
  }
  if (user) {
    return res.status(200).json(user);
  }
  
  return res.status(200).json({msg: "No user found"});

} catch (error) {
   console.log(error);
}
}










