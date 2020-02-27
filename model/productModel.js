const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    imgUrl: {
        type: String,
        required: true,
        minLength: 2
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 5
    },
    size: {
        type: String,
        required: true
    },
    newArrival: {
        type: Boolean,
        required: true
    },
    sex: {
        type: String,
        required: true
    }

})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;