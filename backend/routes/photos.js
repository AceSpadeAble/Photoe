
const express = require('express')
const Photo = require('./../models/photos')
const router = express.Router()

router.route('/').get(async (req, res) => {
    console.log('Get Photo - ', req.body)

    // userId should be on front side 
    let { name, userId } = req.body
    let photo = await Photo.findOne({ name, userId }).lean()
    console.log('photo - ', photo)

    // got params, now search in storage 

    if (photo) {
        res.status(200)
        res.send('Found It !!!')
        // Send "Photo "to front
    } else {
        res.status(400)
        res.send("There is no such thing")
        // Send "Not Found" to front
    }


    res.send('Done Get Photo')
}).post(async (req, res) => {
    console.log('Save Photo - ', req.body)
    res.status(200)
    res.send('Done Save Photo')
}).put((req, res) => {
    console.log('Update Photo - ', req.body)
    res.status(200)
    res.send('Done Update Photo')
}).delete((req, res) => {
    console.log('Delete Photo - ', req.body)
    res.status(200)
    res.send('Done Delete Photo')
})

// router.post('/load', async (req, res) => {
//     console.log('Login - ', req.body)

//     try {
//         let { email, password, username } = req.body
//         let user = await User.findOne({ email, password }).lean()

//         console.log('user - ', user)
//         if (!user) {
//             console.log("Wrong Password And/Or Login")
//             res.status(401, { message: 'Wrong Password And/Or Login' })
//         } else {
//             console.log("Passed")
//             res.status(200, { message: 'Passed' })
//         }

//         res.send('Done Login')
//     } catch (error) {
//         // console.log('error - ', error)
//     }
// })

module.exports = router