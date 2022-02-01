const User = require('../models/user');
module.exports.profile = function(req,res){
    return res.render('profile', {
        title: "Profile"
    });
}

module.exports.posts = function(req,res){
    return res.end('<h1> User Post </h1>');
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Sign In"
    });
}
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Sign Up"
    });
}
//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("error in finding the user in signing up");
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log("error in creating the user in signing up");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}
// sign in and create session for the user
module.exports.createSession = function(req,res){
   return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}