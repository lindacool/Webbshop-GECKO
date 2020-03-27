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
        cart: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            amount: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
                required: true
            },
        }],
        totalCartPrice: {
            type: Number
        }
    }
);

// Function that adds product to cart
userSchema.methods.addToCart = function(product, size){

    let exists = false;

    // Loop through the cart and sets exists = true if the clicked product already exists
    for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].productId._id.toString() == product._id.toString() && this.cart[i].size == size) {
            exists = true;
            this.cart[i].amount ++;
        }
    }

    // Push the clicked product to the user cart if the product does not already exist
    if (!exists) {
        this.cart.push({productId: product._id, size: size});
    }
    
    return this.save();

};

// Function that removes product from cart
userSchema.methods.removeFromCart = function(index){

    this.cart.splice(index, 1);
    
    return this.save();
};

userSchema.methods.increaseCart = function(index){


    this.cart[index].amount ++;
    
    return this.save();

}

// Function that reduces amount of product in cart
userSchema.methods.reduceCart = function(index){


    if(this.cart[index].amount >1 ){

    this.cart[index].amount --;
    } else {
        this.cart.splice(index, 1);
    }

    return this.save();
};


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

