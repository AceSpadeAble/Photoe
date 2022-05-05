
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

            let testUser = await User.findOne({ email }).lean()

            if (testUser) {
                console.log(`User Already Exists`)
                res.status(400, { message: 'User Already Exists' })
            } else {
                //await user.save()
                console.log(`Created New User`)
                res.status(201, { message: 'Created New User' })
            }

        } else {
            res.status(400, { message: 'Something went wrong' })
            res.send(`Something went wrong`)
        }


        res.send('Done Register')
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
        let user = await User.findOne({ email, password }).lean()

        console.log('user - ', user)
        if (!user) {
            res.status(401, {message: 'User not existing'})
        } else {
            console.log("Passed")
            res.status(200, { message: 'Passed' })
        }
        res.send('Done')
    } catch (error) {
        // console.log('error - ', error)
    }
})

module.exports = router