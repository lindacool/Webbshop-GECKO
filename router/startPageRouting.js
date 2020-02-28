const express = require('express');
const Product = require('../model/productModel');

const router = express();

router.get('/', async (req, res) => {
    console.log("hejdjfhejejeij xxxxxxxxxxxxxxxxxxxxxx")
    const newArrivals = await Product.find();
    res.render('startpage', {
        newArrivals
    }) //skickar med newarrivals
})

module.exports = router;