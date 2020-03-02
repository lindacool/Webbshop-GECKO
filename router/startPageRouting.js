const express = require('express');
const Product = require('../model/productModel');

const router = express();

router.get('/', async (req, res) => {
    
    const newArrivals = await Product.find({newArrival: true});
    // const topSellers = await Product.find({topSeller: true});
    // // const startpageProducts = newArrivals.concat(topSellers);
    // // const startPageProducts = [...newArrivals, ...topSellers];  // Merge arrays

    // const startPageProducts = {
    //     newArrivals: newArrivals,
    //     topSellers: topSellers
    // }

    res.render('startPage', newArrivals); //skickar med newarrivals
})

module.exports = router;