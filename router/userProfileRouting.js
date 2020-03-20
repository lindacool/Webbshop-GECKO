const express = require('express');
const Product = require('../model/productModel');
const router = express();
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");

router.get("/wishlist/:id", verifyToken, async (req, res) => {

    const product = await Product.findOne({_id: req.params.id}).populate("user");

    const user = await User.findOne({
        _id: req.body.user._id
    }).populate("wishlist.productId");

    await user.addToWishlist(product);
    
    res.redirect("/wishlist");

});

router.get("/deleteWishlist/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.body.user._id});
    user.removeFromWishlist(req.params.id);

    res.redirect('/wishlist');

});

router.get("/wishlist", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.body.user._id
    }).populate("wishlist.productId");

    res.render('wishlist', {user});

});

// Påbörjad
router.get("/cart/:id", verifyToken, async (req, res) => {

    const product = await Product.findOne({_id: req.params.id}).populate("user");

    const user = await User.findOne({
        _id: req.body.user._id
    }).populate("cart.productId");

    await user.addToWishlist(product);
    
    res.redirect("/cart");

});


module.exports = router;