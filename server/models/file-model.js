const { model, Schema, ObjectId } = require('mongoose')

const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accesLink: {type: String},
    path: {type: String, default: ''},
    date: {type: Date, default: new Date()},
    user: {type: ObjectId, ref: 'User'},
})

module.exports = model('File', File)