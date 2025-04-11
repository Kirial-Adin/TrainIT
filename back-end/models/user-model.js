import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    weight: {type: Number, required: true},
    height: {type: Number, required: true},
    experience: {type: String, required: true},
    trainingGoal: {type: String, required: true},
    points: {type: Number},
    avatar: {type: String},
    files: [{type: ObjectId, ref: 'File'}]
})


export default model('User', UserSchema)
