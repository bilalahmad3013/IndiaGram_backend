const mongoose=require('mongoose');
const { Schema } =mongoose;

const ProfilePicSchema=new Schema({
    
    
    email:{
        type:String,
        required:true,
        unique: true
    },
    pic:{
        type:String,
        required:true,
        unique: true
    }
})

module.exports= mongoose.model('ProfilePicSchema',ProfilePicSchema);