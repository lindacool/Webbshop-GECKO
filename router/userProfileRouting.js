const express = require('express');
const Product = require('../model/productModel');
const router = express();
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");

router.get("/wishlist/:id", verifyToken, async (req, res) => {

    const product = await Product.findOne({_id: req.params.id}).populate("user")

    const user = await User.findOne({
        _id: req.user.user._id
    }).populate("wishlist.productId");

    await user.addToWishlist(product);
    
    res.render("wishlist", {user});
    console.log(user);
    

})


module.exports = router;