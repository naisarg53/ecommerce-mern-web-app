// mongodb scripts here
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    product_title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img:
    {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Cart = mongoose.model('carts', CartSchema)