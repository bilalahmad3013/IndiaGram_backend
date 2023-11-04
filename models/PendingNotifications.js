const mongoose=require('mongoose');
const { Schema } =mongoose;

const PendingNotifications=new Schema({
    
    
    SenderEmail:{
        type:String,
        required:true,
       
    },
    ReceiverEmail:{
        type:String,
        required:true,

    },
    msg:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('PendingNotifications',PendingNotifications);