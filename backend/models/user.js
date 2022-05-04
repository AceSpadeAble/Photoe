const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
    
},
{
    collection: 'User', timestamps: true, skipVersioning: true
})

module.exports = mongoose.model('User', userSchema)