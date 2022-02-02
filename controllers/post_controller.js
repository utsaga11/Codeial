const Post = require('../models/post');

module.exports.createpost = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("Error in uploading the post");
            return;
        }
        return res.redirect('back');
    });
}