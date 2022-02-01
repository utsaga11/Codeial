const express = require('express');
//require cookie parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//connecting database
const db = require('./config/mongoose');
const req = require('express/lib/request');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const mongoStore = require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieParser());

// static files
app.use(express.static('./assets'));
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// call expresslayouts 
app.use(expressLayouts);

// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //todo change the secret before deployment in production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove : 'disabled'
        }, (err)=>
        {
            console.log(err || 'connect-mongodb setup ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

//set the current user
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ! ${err}`);
    }
        console.log(`Server is running on the port: ${port}`);
})
