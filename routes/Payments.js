const express = require('express')
const path = require('path')
const payment = express.Router()
const cors = require('cors')

payment.use(cors())
var Publishable_Key = 'pk_test_51HIoqfJgZPhcUayW0FTmFXKqmLsLJYnHDEMBduQLWnEzEAIFEUqqnAfUySBqVK07vJssaPTRkrZVYBxA6vLMHe0e00AcmZP3yv'
var Secret_Key = 'sk_test_51HIoqfJgZPhcUayWGF12uY1U3vH3dEtFbKUaqvihVss14WL8uPDtgjgmRgq4l3GBUjDZvMeYt3wPiCIntF4K5qWZ00kcTrOSAw'

const stripe = require('stripe')(Secret_Key)

// View Engine Setup 
//payments.set('views', path.join(__dirname, 'views'))
//payments.set('view engine', 'ejs')

payment.get('/', function (req, res) {
    res.render('Home', {
        key: Publishable_Key
    })
})

payment.post('/', (req, res) => {

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({
        source: 'tok_mastercard',
        email: req.body.email,
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: req.body.amount,
                currency: 'inr',
                description: req.body.description,
                customer: customer.id,                
            });
        })
        .then((charge) => {
            res.send("Success")  // If no error occurs 
        })
        .catch((err) => {
            res.send(err)       // If some error occurs 
        });
})
module.exports = payment
