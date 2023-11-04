const mongoose=require('mongoose');
const { Schema } =mongoose;

const followingSchema=new Schema({
    
    
    email:{
        type:String,
        required:true,
        unique: true
    },
    followings:{
        type:Array
    }
})

module.exports= mongoose.model('followingSchema',followingSchema);