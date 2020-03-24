const express = require('express');
const Product = require('../model/productModel');
const router = express();
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");

router.get("/cart/:id", verifyToken, async (req, res) => {

    const product = await Product.findOne({_id: req.params.id}).populate("user");

    const user = await User.findOne({
        _id: req.user.user._id
    }).populate("cart.productId");

    await user.addToCart(product);
    
    res.redirect("/cart");

});

router.get("/deleteCart/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({_id: req.user.user._id});
    user.removeFromCart(req.params.id);

    res.redirect('/cart');

});

router.get("/cart", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.user.user._id
    }).populate("cart.productId");

    res.render('cart', {user});

});




module.exports = router;