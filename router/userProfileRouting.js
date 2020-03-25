const express = require('express');
const Product = require('../model/productModel');
const router = express();
const verifyToken = require('./verifyToken');
const {
    User
} = require("../model/userModel");

router.post("/cart/:id", verifyToken, async (req, res) => {

    const product = await Product.findOne({_id: req.params.id}).populate("user");
    const size = req.body.size
    console.log(size);
    const user = await User.findOne({
        _id: req.user.user._id
    }).populate("cart.productId");

    await user.addToCart(product, size);
    
    res.redirect("/cart");

});

router.get("/deleteCart/:index", verifyToken, async (req, res) => {


    const index = req.params.index
    const user = await User.findOne({_id: req.user.user._id});
    user.removeFromCart(index);

    res.redirect('/cart');

});

router.get("/cart", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.user.user._id
    }).populate("cart.productId");

    res.render('cart', {user});

});




module.exports = router;