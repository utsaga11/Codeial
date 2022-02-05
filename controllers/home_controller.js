const Post = require('../models/post');
const User = require('../models/user');

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
        //sending all users
        User.find({},function(err,users){
           return res.render('home', {
            title: "Codeial || Home",
            posts: posts,
            all_users: users
        });  
        })
       });
}