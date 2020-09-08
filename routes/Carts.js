// node.js scripts here
const express = require('express')
const carts = express.Router()
const cors = require('cors')
const ObjectId = require('mongoose').ObjectId

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
    cb(null, false);

};

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });
//const upload = multer({ dest: 'uploads/' });
const Cart = require('../models/Cart')
carts.use(cors())

process.env.SECRET_KEY = 'secret'

carts.post('/productRegister/addToCart', upload.single('img'), (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const today = new Date()
    const cartData = {
        user_id: req.body.user_id,
        product_title: req.body.product_title,
        price: req.body.price,
        img: req.body.img,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        created: today
    }
    console.log(cartData);

    // Cart.findOne({ // check product in user id exist
    //   user_id: req.body.user_id  
    // })
    //   .then(cart => {
                Cart.create(cartData)
                    .then(cart => {
                        res.json({ status: cart.product_title + ' Product Added to Cart' })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
             
        })


carts.get('/getProducts/getCart/:user_id', (req, res) => {

    Cart.find({
        user_id: req.params.user_id
    })
        .then(cart => {
            if (cart) {
                res.json(cart)
            } else {
                res.send('Product does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

carts.delete('/deleteProduct/:id', (req, res) => {

    Cart.findOneAndDelete({_id: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

carts.put('/update-cart/:user_id', (req, res) => {

    Cart.findByIdAndUpdate(req.params.user_id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return error;
            console.log(error)
        } else {
            res.json(data)
            console.log('Cart Quantity updated successfully !')
        }
    })
})

module.exports = carts