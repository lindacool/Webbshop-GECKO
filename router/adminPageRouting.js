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
        topSeller: req.body.topSeller = Boolean(req.body.topSeller),
        male: req.body.male = Boolean(req.body.male),
        female: req.body.female = Boolean(req.body.female)
    })
    await product.save( (error, succes)=>{
        if(error) {
            res.send(error.message)
        }
    })

    res.redirect('admin')
});

router.get("/products/:id", async (req, res) => {

    const clickedProduct = await Product.findById( {_id: req.params.id} );
    
    res.render("detailProductPage", { clickedProduct });
    
});

module.exports = router;