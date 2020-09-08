var express = require('express')
var cors = require('cors') // alloes cross-domain requests.
var bodyParser = require('body-parser') // to parse JSON request
var app = express() // manages HTTP
const mongoose = require('mongoose') // It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
var port = process.env.PORT || 5000
var fs = require('fs');
var path = require('path');
const dotenv = require("dotenv");
dotenv.config()

//const configureRoutes = require('./routes')
//configureRoutes(app);

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.use(express.static(path.join(__dirname, 'client/build')))
//mongodb+srv://m001-student:<password>@cluster0-z5fo7.mongodb.net/test

const connection = "mongodb+srv://ecommercenshop:don654321@cluster0-z5fo7.mongodb.net/ecommercenshop";
mongoose.connect(process.env.MONGODB_URL || connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
/*
const mongoURI = 'mongodb://localhost:27017/mernloginreg' // use merloginreg

mongoose
    .connect(
        mongoURI,
        {
            useNewUrlParser: true,
  //          useUnifiedTopology: true
        }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))
    */

var Users = require('./routes/Users');
var Products = require('./routes/Products');
var Carts = require('./routes/Carts');
var Shippings = require('./routes/Shippings');
var Payments = require('./routes/Payments');

app.use('/users', Users);
app.use('/Uploads', express.static('Uploads'));

app.use('/carts', Carts);
//app.use('/CartUploads', express.static('CartUploads'));
//app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use('/products', Products);
app.use('/shippings', Shippings);
app.use('/payment', Payments);
/*
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}*/

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, function () {
    console.log('Server is running on port: ' + port)
})

