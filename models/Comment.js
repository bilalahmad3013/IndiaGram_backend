const mongoose=require('mongoose');
const { Schema } =mongoose;

const CommentSchema=new Schema({    
    email:{
        type:String,
        required:true,        
    },
    postUser:{
       type:String,
       required:true
    },
    postId:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    }
})

module.exports= mongoose.model('CommentSchema',CommentSchema);