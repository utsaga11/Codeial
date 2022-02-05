const User = require('../models/user');
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
       return res.render('profile', {
        title: "Profile",
        profile_user: user
    }); 
    });
    
}

module.exports.update = function(req, res){
    if( req.user.id == req.params.id){
        console.log(req.body);
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            if(err){
                console.log('ERROR',err);
                return res.redirect('back');
            }
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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