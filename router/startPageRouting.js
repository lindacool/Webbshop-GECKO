const express = require('express');
const Product = require('../model/productModel');

const router = express();

router.get('/', async (req, res) => {
    
    const newArrivals = await Product.find({newArrival: true});
    const topSellers = await Product.find({topSeller: true});

    const startPageProducts = {
        newArrivals: newArrivals,
        topSellers: topSellers
    }
    res.render('startPage', {startPageProducts}); //skickar med newarrivals
})

module.exports = router;