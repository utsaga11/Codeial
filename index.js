const express = require('express');
//require cookie parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//connecting database
const db = require('./config/mongoose');

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

//use express router
app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ! ${err}`);
    }
        console.log(`Server is running on the port: ${port}`);
})
