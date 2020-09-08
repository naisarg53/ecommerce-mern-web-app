// node.js scripts here
const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken') // authetication
const bcrypt = require('bcrypt') // password security

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret' 

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => { // 10 is salt round  
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' Registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Passwords match
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, { // authentication
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    // Passwords don't match
                    res.json({ error: 'User does not exist' })
                }
            } else {
                res.json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

   /* var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })*/

users.get('/login/User/:email', (req, res) => {

    User.findOne({ email: req.params.email }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            if (data != null) {
                res.status(200).json({
                    msg: data.first_name
                    //  msg: 'aaa'
                })
            } else {
                res.status(200).json({
                    msg: 'User'
                })
            }
        }
    })
})

module.exports = users