const Post = require('../models/post');

module.exports.home = function (req, res){
    // populating the post with user
    Post.find({})
    .populate('user')
    .populate({
       path: 'comments',
       populate:{
           path:'user'
       } 
    })
    .exec(function (err, posts) {
        return res.render('home', {
            title: "Codeial || Home",
            posts: posts
        });
    });
}