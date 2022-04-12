
const express = require('express')
//const mongoose = require('mongoose')

const User = require('./../models/user')
const router = express.Router()

// Get Users List
// router.get('/', (req, res) => {
//     res.send("User List")
// })

router.route('/:email').get((req, res) => {
    const email = req.params.email

    const user = User.findOne({email: req.params.email})

    if (!user) {
        res.send(`Get User with email ${email}`)
    } 

    console.log('user - ', user)
    res.send(`Get User with email ${email}`)
}).post(async (req, res) => {

    console.log('TEST - ', req.body)

    let user = new User({
        email: req.body.email,
        password: req.body.password,
        // email: req.body.email
    })
    console.log('user - ', user)

    try {
        // await user.save()
        res.send(`Created New User`)
    } catch (error) {
        console.log('error - ', error)
        res.send(`Something went wrong`)
    }
}).put((req, res) => {
    const email = req.params.email
    res.send(`Update User with email ${email}`)
}).delete((req, res) => {
    const email = req.params.email
    res.send(`Delete User with email ${email}`)
})

module.exports = router