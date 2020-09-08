// node.js scripts here
const mongoose = require('mongoose');
const express = require('express')
const products = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken') // authetication

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ file.originalname);
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
const Product = require('../models/Product')
products.use(cors())

process.env.SECRET_KEY = 'secret'

products.post('/productRegister', upload.single('img'), (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const today = new Date()
    const productData = {
        product_title: req.body.product_title,
        price: req.body.price,
        img: url + '/Uploads/' + req.file.filename,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        created: today
    }
    console.log(productData);
    Product.findOne({
        product_title: req.body.product_title
    })
        .then(product => {
            if (!product) {
                Product.create(productData)
                    .then(product => {
                        res.json({ status: product.product_title + ' Product Added' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
            } else {
                res.json({ error: 'Product already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

products.get('/getProducts', (req, res) => {
    
    Product.find()
        .then(product => {
            if (product) {
                res.json(product)
            } else {
                res.send('Product does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

products.put('/update-product/:product_id', upload.single('img'), (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const today = new Date()
    const productData = {
        product_title: req.body.product_title,
        price: req.body.price,
        img: url + '/Uploads/' + req.file.filename,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        created: today
    }
    console.log(productData);
    Product.findOneAndUpdate(req.params.product_id, {
        $set: productData 
    }, (error, data) => {
        if (error) {
            return error;
            console.log(error)
        } else {
            res.json(data)
            console.log('Product updated successfully !')
        }
    })
        
})

products.delete('/deleteProduct/:id', (req, res) => {

    Product.findOneAndDelete({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = products