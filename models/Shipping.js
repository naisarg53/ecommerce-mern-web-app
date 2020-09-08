// mongodb scripts here
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ShippingSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Shipping = mongoose.model('shippings', ShippingSchema)