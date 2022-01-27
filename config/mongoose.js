const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

//if error
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

//when connected
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
