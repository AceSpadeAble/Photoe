
const express = require('express')
const { default: mongoose } = require('mongoose')
const Photo = require('./../models/photos')
const User = require('./../models/user')
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: "images/" })

router.route('/').get(async (req, res) => {
    
}).post(async (req, res) => {

}).put((req, res) => {
    console.log('Update Photo - ', req.body)
    res.status(200)
    res.send('Done Update Photo')
}).delete((req, res) => {
    console.log('Delete Photo - ', req.body)
    res.status(200)
    res.send('Done Delete Photo')
})

router.post('/get', async (req, res) => {
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
})

router.post('/save', async (req, res) => {
    console.log('Save Photo - ', req.body)

    let { name, userId } = req.body

    let photo = new Photo({
        name,
        userId,
        // settings
    })

    //const newId = photo._id.toString()
    console.log('photo - ', photo)
    //console.log('_id - ', newId)

    try {
        if (req.body) {

            let user = await User.findById(userId).lean()
            user.photos = [...user.photos, photo._id]
            console.log('user - ', user)
            // await user.save()
            // await photo.save()
            console.log(`Picture Saved`)
            res.status(201, { message: 'Picture Saved' })

        } else {
            res.status(400, { message: 'Something went wrong' })
            res.send(`Something went wrong`)
        }


        //res.status(200)
        //res.send('Done Save Photo')
    } catch (error) {
        console.log('error - ', error)
    }

})


router.post("/upload", uploadFiles);
function uploadFiles(req, res) {
    console.log(req.body);
}


router.post('/upload', upload.single("files"), async (req, res) => {
    console.log('Uplaod Photo - ', req.body)

    let { name, uid, settings } = req.body

    let photo = new Photo({
        name,
        uid,
        settings
    })

    //const newId = photo._id.toString()
    console.log('photo - ', photo)
    //console.log('_id - ', newId)

    try {
        if (req.body) {

            let user = await User.findById(uid).lean()
            user.photos = [...user.photos, photo._id]
            console.log('user - ', user)
            await user.save()
            await photo.save()
            console.log(`Picture Saved`)
            res.json({ message: "Successfully uploaded files" });

        } else {
            res.status(400, { message: 'Something went wrong' })
            res.json({ message: `Something went wrong`})
        }


        //res.status(200)
        //res.send('Done Save Photo')
    } catch (error) {
        console.log('error - ', error)
    }

})

module.exports = router