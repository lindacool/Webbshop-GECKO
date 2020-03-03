const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    }
});

const User = mongoose.model("User", userSchema);


function validateUser(user){
    const schema = {
        firstName:joi.string().min(2).max(100).required(),
        surname:joi.string().min(2).max(100).required(),
        email:joi.string().min(2).max(100).required().email(),
        password:joi.string().min(8).max(50)
    }

    return joi.validate(user, schema);
}



module.exports.User = User;
module.exports.validateUser = validateUser;