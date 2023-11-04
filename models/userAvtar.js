const mongoose=require('mongoose');
const { Schema } =mongoose;

const userAvtar=new Schema({
    photo:{
        type:String
       
    },
    email:{
        type:String,
        required:true,
        unique: true
    }
 
})

module.exports= mongoose.model('userAvtar',userAvtar);