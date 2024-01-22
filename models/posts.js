const mongoose=require('mongoose');
const { Schema } =mongoose;

const PostSchema=new Schema({   
    email:{
        type:String,
        required:true,
        unique: true
    },
    posts:{
        type:Array
    }
})
module.exports= mongoose.model('PostSchema',PostSchema);