const express = require ('express');
const Product = require('../model/productModel');


const router = express.Router();


router.get('/admin', async (req, res)=>{
    const products = await Product.find();
    res.render('admin', {products}) //skickar med alla produkter
})

router.post('/admin', async (req, res)=>{


    const product = new Product({
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        description: req.body.description,
        size: req.body.size,
        newArrival: req.body.newArrival = Boolean(req.body.newArrival),
        male: req.body.male = Boolean(req.body.male),
        female: req.body.female = Boolean(req.body.female)
    })
    await product.save( (error, succes)=>{
        if(error) {
            res.send(error.message)
        }
    })

    res.redirect('admin')
})

module.exports = router;