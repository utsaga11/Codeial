const User = require('../models/user');
module.exports.profile = function(req,res){
    if(req.cookies.user_id){
      User.findById(req.cookies.user_id, function(err,user){
          if(err){
              console.log("error in fiding the cookie :(");
          }
          if(user){
            return res.render('profile', {
                title: "Profile",
                user: user
            });
          }else{
              return res.redirect('/users/sign-in');
          }
      })
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.posts = function(req,res){
    return res.end('<h1> User Post </h1>');
}

module.exports.signin = function(req,res){
    return res.render('user_sign_in', {
        title: "Sign In"
    });
}
module.exports.signup = function(req,res){
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
    // find the user
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log("error in finding the user in signing in");
            return;
        }
         //handle user found

         if(user){
             //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
             //handle session creation
             res.cookie('user_id',user.id);
             return res.redirect('/users/profile');

         }else{
         //handle user not found
            return res.redirect('back');
         }
    });
}