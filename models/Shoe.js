// CHECK SCHEMA PROPERTIES/NAMES

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: /^https?/,
    },
    brand: {
        type: String
    },
    createdAt:{
        type: Date || String,
        required: true,
    },
    buyers: []
})


module.exports = mongoose.model('Product', productSchema);