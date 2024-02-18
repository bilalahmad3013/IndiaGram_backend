const Post = require('../models/posts');
const Comment=require('../models/Comment');
const User=require('../models/user');
const queue=require('../config/kue');

module.exports.getComments = async function (req, res) {
    const postId = req.body.postId;
  
    try {
      const comments = await Comment.find({ postId: postId });
  
      if (!comments) {
        return res.status(404).json({ error: 'Comments not found for the post' });
      }  
      res.status(200).json({ comments: comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.addComment = async function (req, res) {    
    const { user, id, commentedUser, comment } = req.body;  
    let name;
    let pic;
    try {    
      const existingUser = await Post.findOne({ email: user });
      
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }      
      const post = existingUser.posts.find((p) => p.id === id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }     
      
      const fetchedUser = await User.findOne(
        { email: commentedUser },
        { name: 1, email: 1, pic: 1 }
      ); 
     
      if (!fetchedUser) {
        return res.status(404).json({ error: 'Commented user not found' });
      }
  
     
      name = fetchedUser.name;
      pic = fetchedUser.pic;
  
     
      const newComment = new Comment({
        email: user,
        postUser: commentedUser,
        postId: id,
        comment: comment,
        name: name,
        pic: pic
      });     
      await newComment.save();
      const commentMailer={
        commentedUser:commentedUser
      }
      let job = queue.create('emails', commentMailer).save(function(err){
        if(err){
          console.log("Error in sending the comment publish email")
          return;
        }else{
          console.log("Job enqueued", job.id);
        }
      })
      res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports.delelteComment = async (req, res) => {

}
