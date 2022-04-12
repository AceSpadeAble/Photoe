
const express = require('express')
const User = require('./../models/user')
const router = express.Router()

router.route('/').get(async (req, res) => {
    try {
        let { email, password, username } = req.body

        let user = await User.findOne({ email, username }).lean()
        // const user = User.findOne({email: req.params.email})

        if (!user) {
            console.log('Get User with email')
            res.status(401, {message: 'Error'})
        } else {

            if (user.password === password) {
                res.send(`Get User with email ${email}`)
            } else {
                res.send(`Wrong Password`)
            }
        }

        res.send('Done')
    } catch (error) {
        // console.log('error - ', error)
    }

}).post(async (req, res) => {

    console.log('TEST - ', req.body)
    let { username, email, password } = req.body

    let user = new User({
        username,
        email,
        password,
    })
    console.log('user - ', user)

    try {
        if (req.body) {
            await user.save()
            console.log(`Created New User`)
            res.send(`Created New User`)
        } else {
            res.send(`Something went wrong`)
        }

    } catch (error) {
        console.log('error - ', error)
    }
}).put((req, res) => {
    const email = req.params.email
    res.send(`Update User with email ${email}`)
}).delete((req, res) => {
    const email = req.params.email
    res.send(`Delete User with email ${email}`)
})

module.exports = router