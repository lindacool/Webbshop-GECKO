const express = require('express');
const Product = require('../model/productModel');
const verifyToken = require('../router/verifyToken');


const router = express.Router();


router.get('/admin', verifyToken, async (req, res) => {
    const products = await Product.find();

    
   // const user = await req.user

    if (req.user.user.isAdmin === true) {
        res.render('admin.ejs', {products}) 
    } else {
        res.send("not ok")
    }
})

router.post('/createProduct', verifyToken, async (req, res) => {

    console.log(req.body);
    
    const product = new Product({
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        imgUrlTwo: req.body.imgUrlTwo,
        imgUrlThree: req.body.imgUrlThree,
        price: req.body.price,
        description: req.body.description,
        newArrival: req.body.newArrival = Boolean(req.body.newArrival),
        topSeller: req.body.topSeller = Boolean(req.body.topSeller),
        male: req.body.male = Boolean(req.body.male),
        female: req.body.female = Boolean(req.body.female),
        user: req.user.user._id
        // title: "hej",
        // imgUrl: "hej",
        // imgUrlTwo: "hej",
        // imgUrlThree: "hej",
        // price: 100,
        // description: "hej",
        // newArrival: req.body.newArrival = Boolean(req.body.newArrival),
        // topSeller: req.body.topSeller = Boolean(req.body.topSeller),
        // male: req.body.male = Boolean(req.body.male),
        // female: req.body.female = Boolean(req.body.female),
        // user: req.body.user._id
    });

    await product.save((error, succes) => {
        if (error) {
            res.send(error.message)
        }
    });

    res.redirect('admin');
});


router.post("/edit/:id", verifyToken, async (req, res) => {

    await Product.updateOne({
        _id: req.params.id
    }, {
        $set: {
            title: req.body.title,
            imgUrl: req.body.imgUrl,
            imgUrlTwo: req.body.imgUrlTwo,
            imgUrlThree: req.body.imgUrlThree,
            price: req.body.price,
            description: req.body.description,
            size: req.body.size,
            newArrival: req.body.newArrival = Boolean(req.body.newArrival),
            topSeller: req.body.topSeller = Boolean(req.body.topSeller),
            male: req.body.male = Boolean(req.body.male),
            female: req.body.female = Boolean(req.body.female)
        }
    });

    res.redirect("/admin");

});


module.exports = router;