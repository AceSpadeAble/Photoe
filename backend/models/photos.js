const mongoose = require('mongoose')


const photosSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // Settings for this picture (waiting for params)
    createdAt: {
        type: Date,
        default: Date.now
    }
    
},
{
    collection: 'Photo', timestamps: true, skipVersioning: true
})

module.exports = mongoose.model('Photo', photosSchema)