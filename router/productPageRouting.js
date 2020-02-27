const express = require ('express');
const Product = require('../model/productModel');

const router = express.Router();



router.get('/products', async (req, res)=>{

//    const product = new Product({

//     title: "Tjejtröja",
//     imgUrl: "URL",
//     price: 15,
//     description: "Description",
//     size: "XXL",
//     newArrival: false,
//     sex: "F"
//    })
//    await product.save()
    const products = await Product.find();

    res.render('productPage', {products}) //skickar med alla produkter
})



router.get('/women', async (req, res)=>{
    const products = await Product.find({sex: 'F'});

    res.render('productPage', {products}) //skickar med alla kvinno-produkter
})

router.get('/men', async (req, res)=>{
    const products = await Product.find({sex: 'M'});
    //en query som hämtar alla som är men;

    res.render('productPage', {products}) //skickar med alla man-produkter
})

module.exports = router;