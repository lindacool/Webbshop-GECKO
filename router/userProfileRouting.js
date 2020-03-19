const express = require('express');
const Product = require('../model/productModel');
const router = express();
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");

router.get("/wishlist/:id", verifyToken, async (req, res) => {

    const product = await Product.findOne({_id: req.params.id}).populate("user")

    console.log("product with user population", product)

    const user = await User.findOne({
        _id: req.body.user._id
    })

    await user.addToWishList(product)
    
    res.send("wishlisted");

})


module.exports = router;