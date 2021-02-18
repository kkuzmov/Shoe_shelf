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
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    createdAt:{ 
        type: Date,
        default: Date.now 
    },
    buyers: [],
    creator: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Product', productSchema);