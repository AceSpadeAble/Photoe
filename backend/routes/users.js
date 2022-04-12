
const express = require('express')
//const mongoose = require('mongoose')

const User = require('./../models/user')
const router = express.Router()

// Get Users List
// router.get('/', (req, res) => {
//     res.send("User List")
// })

router.route('/').get(async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email }).lean()
        // const user = User.findOne({email: req.params.email})

        if (!user) {
            console.log('Get User with email')
            res.send(`Get User with email ${email}`)
        }

        console.log('user - ', user)
        res.send(`Get User with email ${email}`)
    } catch (error) {
        console.log('error - ', error)
    }

}).post(async (req, res) => {

    console.log('TEST - ', req.body)

    let user = new User({
        email: req.body.email,
        password: req.body.password,
        // email: req.body.email
    })
    console.log('user - ', user)

    try {
        if (req.body) {
            //await user.save()
            console.log(`Created New User`)
            res.send(`Created New User`)
        }

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