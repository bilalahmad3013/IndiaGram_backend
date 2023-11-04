const mongoose=require('mongoose');
const { Schema } =mongoose;

const Notifications=new Schema({
    
    
    email:{
        type:String,
        required:true,
       
    },
    NotificationArray:{
        type:Array
    }
})

module.exports= mongoose.model('Notifications',Notifications);