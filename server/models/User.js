const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userName:{
        type : String,
        required : true,
        unique : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
    },
    role:{
        type : String,
        default: 'user'
    },
});


// Create the User model using the schema directly
const User = mongoose.model('User', UserSchema); 

// Export the User model
module.exports = User;