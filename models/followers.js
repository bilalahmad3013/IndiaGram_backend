const mongoose=require('mongoose');
const { Schema } =mongoose;

const followSchema=new Schema({
    
    
    email:{
        type:String,
        required:true,
        unique: true
    },
    followers:{
        type:Array
    }
})

module.exports= mongoose.model('followSchema',followSchema);