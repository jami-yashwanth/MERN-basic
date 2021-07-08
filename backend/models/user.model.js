const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        minlength : 3,
        required : true,
        unique : true,
        trim : true,
    }
},{
    timestamps : true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;