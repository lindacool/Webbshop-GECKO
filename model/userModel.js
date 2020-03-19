const mongoose = require("mongoose");
const joi = require("joi");
const Schema = require("mongoose").Schema;

const userSchema = new Schema({
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100
        },
        surName: {
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
            maxlength: 200
        },
        isAdmin: {
            type: Boolean,
            default:false


        },
        resetToken: String,
        expirationToken: Date,
        wishlist: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }]
    }
);

// Function that adds product to wishlist
userSchema.methods.addToWishlist = function(product){
    this.wishlist.push({productId: product._id})
    return this.save();
}

// Function that removes product to wishlist
userSchema.methods.removeFromWishlist = function(productId){
    this.wishlist.splice({productId: product._id})
    return this.save();
}



const User = mongoose.model("User", userSchema);


function validateUser(user) {
    const schema = {
        firstName: joi.string().min(2).max(100).required(),
        surName: joi.string().min(2).max(100).required(),
        email: joi.string().min(2).max(100).required().email(),
        password: joi.string().min(8).max(200),
        
    }

    return joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;