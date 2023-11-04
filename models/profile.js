const mongoose=require('mongoose');
const { Schema } =mongoose;

const ProfileSchema=new Schema({
    userEmail:{
        type:String, 
        unique: true
    },
    fullname:{
        type:String,        
    },
    dob:{
        type:String,        
    },
    private:{
        type:Boolean,        
    },
    contactinfo:{
        type:String,
    },
    bio:{
       type:String
    }  
})

module.exports= mongoose.model('Profile',ProfileSchema);