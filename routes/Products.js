// node.js scripts here
const mongoose = require('mongoose');
const express = require('express')
const products = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken') // authetication

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');



const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: 'productimageupload'
});

const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'productimageupload',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('img');

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

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
const Product = require('../models/Product')
products.use(cors())

process.env.SECRET_KEY = 'secret'

products.post('/productRegister', profileImgUpload, (req, res) => {

    const url = req.protocol + '://' + req.get('host')
    const today = new Date()
    console.log(req.file);
    const productData = {
        product_title: req.body.product_title,
        price: req.body.price,

        //img: url + 'Uploads/' + req.file.filename,
        img: req.file.location,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        created: today
    }
    console.log(req.file.location);
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
                res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                res.header("Pragma", "no-cache");
                res.header("Expires", 0);

                Product.find()
                    .then(product => {
                        if (product) {
                            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                            res.header("Pragma", "no-cache");
                            res.header("Expires", 0);
                            res.json(product)
                        } else {
                            res.send('Product does not exist')
                        }
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            }
        })
})

products.put('/update-product/:id', profileImgUpload, async (req, res) => {

    const { id: _id } = req.params;
    // const post = req.body;
    // console.log(post);
    const today = new Date()
    const productData = {
        _id: _id,
        product_title: req.body.product_title,
        price: req.body.price,
        img: req.file.location,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        created: today
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updateItem = await Product.findByIdAndUpdate(_id, productData, { new: true });

    res.json(updateItem);

    /*
=======
products.put('/update-product/:product_id', upload.single('img'), (req, res) => {
>>>>>>> ec89379130c9d672eda92a907a3f1b4ba92c44f2
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
        $set: productData 
    }, (error, data) => {
        if (error) {
            return error;
            console.log(error)
        } else {
<<<<<<< HEAD
            console.log(req.params.product_id)
=======
>>>>>>> ec89379130c9d672eda92a907a3f1b4ba92c44f2
            res.json(data)
            console.log('Product updated successfully !')
        }
    })
<<<<<<< HEAD
    */
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
    });
})

module.exports = products
