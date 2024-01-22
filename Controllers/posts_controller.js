const Posts = require('../models/posts');

module.exports.postsController = async (req, res) => {
    try {
        let user = await Posts.findOne({ email: req.body.userEmail });
        const postURL = `/uploads/posts/${req.file.filename}`;
        const caption = req.body.caption;
        const obj = {
            picURL: postURL,
            caption: caption,
            id: new Date().toISOString()
        }
        if (user) {
            await Posts.findOneAndUpdate({ email: req.body.userEmail }, { $push: { posts: obj } })
        }
        else {
            await Posts.create({
                email: req.body.userEmail,
                posts: [obj]
            })
        }
        res.status(200).json({ msg: "post uploaded successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to upload post" });
    }
}

module.exports.getPosts = async (req, res) => {
    try {        
        const email = req.body.email;
        const limit = 3;
        const skip = req.body.skip;

        const user = await Posts.findOne({email:email}); 
        
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        const startIndex = skip * limit;        
        const paginatedPosts = user.posts.slice(startIndex, startIndex + limit);

        res.status(200).json({ posts: paginatedPosts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
}
