var express = require('express')
var cors = require('cors') // alloes cross-domain requests.
var bodyParser = require('body-parser') // to parse JSON request
var app = express() // manages HTTP
const mongoose = require('mongoose') // It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
var port = process.env.PORT || 5000
var fs = require('fs');
var path = require('path');
const dotenv = require("dotenv");
const morgan = require('morgan')
dotenv.config()


app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const connection = "mongodb+srv://ecommercenshop:don654321@cluster0.z5fo7.mongodb.net/ecommercenshop?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGODB_URL || connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

var Users = require('./routes/Users');
var Products = require('./routes/Products');
var Carts = require('./routes/Carts');
var Shippings = require('./routes/Shippings');
var Payments = require('./routes/Payments');

app.use('/users', Users);
app.use('/Uploads', express.static('Uploads'));

app.use('/carts', Carts);
app.use('/products', Products);
app.use('/shippings', Shippings);
app.use('/payment', Payments);

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
}
app.use(morgan('tiny'));

app.listen(port, function () {
    console.log('Server is running on port: ' + port)
})

