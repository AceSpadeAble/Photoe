
const express = require('express')
const User = require('./../models/user')
const router = express.Router()

router.route('/').get(async (req, res) => {
    res.status(200)
}).post(async (req, res) => {
    console.log('Register - ', req.body)

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

router.post('/login', async (req, res) => {
    console.log('Login - ', req.body)

    try {
        let { email, password, username } = req.body

        // TO DO
        // let user = await User.findOne({ email, password }).lean()
        let user = await User.findOne({ email }).lean()
      
        console.log('user - ', user)
        if (!user) {
            console.log('User not existing')
            res.status(401, {message: 'User not existing'})
        } else {

            if (user.password === password) {
                res.send(`Get User with email ${email}`)
            } else {
                res.status(401, {message: 'Wrong Password'})
               // res.send(`Wrong Password`)
            }
        }

        res.send('Done')
    } catch (error) {
        // console.log('error - ', error)
    }
})

module.exports = router