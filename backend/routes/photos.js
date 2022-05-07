
const express = require('express')
const { default: mongoose } = require('mongoose')
const Photo = require('./../models/photos')
const User = require('./../models/user')
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: "images/" })

router.post('/getImages', async (req, res) => {
    console.log('Get Photo - ', req.body)

    // userId should be on front side 
    let { uid } = req.body
    let photos = await Photo.find({ userId: uid }).lean()
    console.log('photos - ', photos)

    // got params, now search in storage 

    if (photos) {
        res.status(200)
        res.json(photos)
    } else {
        res.status(400)
        res.send("There is no such thing")
        // Send "Not Found" to front
    }

   // res.send('Done Get Photo')
})

router.post('/upload', upload.single("files"), async (req, res) => {
    console.log('Uplaod Photo - ', req.body)

    console.log('req.files - ', req.file)
    
    let { uid, settings } = req.body

    let photo = new Photo({
        name: req.file.filename,
        uid,
        settings
    })

    //const newId = photo._id.toString()
    console.log('photo - ', photo)
    //console.log('_id - ', newId)

    try {
        if (req.body) {

            let user = await User.findByIdAndUpdate(uid, {
                $addToSet: { photos: photo._id }
            }, { safe: true, new: true }).lean()
            console.log('user - ', user)
            await photo.save()
            console.log(`Picture Uploaded`)
            res.json({ message: "Successfully uploaded files" });

        } else {
            res.status(400, { message: 'Something went wrong' })
            res.json({ message: `Something went wrong` })
        }


        //res.status(200)
        //res.send('Done Save Photo')
    } catch (error) {
        console.log('error - ', error)
    }

})

router.post('/saveSettings', async (req, res) => {
    console.log('Save Photo Settings - ', req.body)
    
    let stringSettings = JSON.stringify(req.body.settings)
    // console.log('phostringSettingst - ', stringSettings)


    try {
        if (req.body) {

            let photo = await Photo.findOne({name: req.body.imageId })
            photo.settings = stringSettings
            console.log('photo - ', photo)
            await photo.save()

            console.log(`Picture Settings Saved`)
            res.json({ message: "Picture Settings Saved" });

        } else {
            res.status(400, { message: 'Something went wrong' })
            res.json({ message: `Something went wrong` })
        }


        //res.status(200)
        //res.send('Done Save Photo')
    } catch (error) {
        console.log('error - ', error)
    }

})


module.exports = router