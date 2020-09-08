// node.js scripts here
const express = require('express')
const shippings = express.Router()
const cors = require('cors')

const Shipping = require('../models/Shipping')
shippings.use(cors())

process.env.SECRET_KEY = 'secret'

shippings.post('/shipping', (req, res) => {
    const today = new Date()
    const shippingData = {
        user_id: req.body.user_id,
        address: req.body.address,
        city: req.body.city,
        postal_code: req.body.postal_code,
        country: req.body.country,
        phone: req.body.phone,
        created: today
    }

    Shipping.findOne({
        phone: req.body.phone
    })
        .then(shipping => {
            if (!shipping) {
                Shipping.create(shippingData)
                    .then(shipping => {
                        res.json({ status: shipping.phone + ' Shipping Added!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })               
            } else {
                res.json({ error: 'Phone already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

shippings.get('/shipping/:user_id', (req, res) => {

    Shipping.find({
        user_id: req.params.user_id
    })
        .then(shipping => {
            if (shipping) {
                res.json(shipping)
            } else {
                res.send('Shipping Address does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})
/*
shippings.post('/update-shipping/:user_id', (req, res) => {
    const today = new Date()
    const shippingData = {
        address: req.body.address,
        city: req.body.city,
        postal_code: req.body.postal_code,
        country: req.body.country,
        phone: req.body.phone,
        created: today
    }

    Shipping.findOne({
        user_id: req.params.user_id
    })
        .then(shipping => {
            if (shipping) {
                //Shipping.create(shippingData)
                shipping.save(shippingData)  
                .then(shipping => {
                        res.json({ status: shipping.phone + ' Shipping Updated!' })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'Shipping Address Update Failed' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})*/

shippings.put('/update-shipping/:user_id', (req, res) => {

    Shipping.findOneAndUpdate(req.params.user_id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return error;
            console.log(error)
        } else {
            res.json(data)
            console.log('Shipping updated successfully !')
        }
    })
})

module.exports = shippings