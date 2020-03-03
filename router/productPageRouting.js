const express = require ('express');
const Product = require('../model/productModel');

const router = express.Router();



router.get('/products', async (req, res)=>{

    const products = await Product.find();
    const heading = "Unisex";
    const otherCategories = ["Shop Men", "Shop Women"];

    res.render('productPage', {products, heading, otherCategories}); //skickar med alla produkter
})



router.get('/women', async (req, res)=>{
    const products = await Product.find({female: true});
    const heading = "Women";
    const otherCategories = ["Shop Unisex", "Shop Men"];

    res.render('productPage', {products, heading, otherCategories}); //skickar med alla kvinno-produkter
})

router.get('/men', async (req, res)=>{
    const products = await Product.find({male: true});
    const heading = "Men";
    const otherCategories = ["Shop Unisex", "Shop Women"];

    res.render('productPage', {products, heading, otherCategories}) //skickar med alla man-produkter
})

module.exports = router;