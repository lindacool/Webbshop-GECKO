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
    const allProducts = await Product.find();

    res.render('productPage', {allProducts}) //skickar med alla produkter
})

router.get('/women', async (req, res)=>{
    const womenProducts = await Product.find();

    res.render('startpage', {womenProducts}) //skickar med alla kvinno-produkter
})

router.get('/men', async (req, res)=>{
    const menProducts = await Product.find()
    //en query som hämtar alla som är men;

    res.render('startpage', {menProducts}) //skickar med alla man-produkter
})

module.exports = router;