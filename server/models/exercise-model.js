const {Schema, model } = require('mongoose')
// import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
    title: { type: String, required: true },
    complexity: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    recommendation: { type: String, required: true },
    type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'balance', 'other'], required: true },
    equipment: { type: String, required: true },
    measurementType: { type: String, required: true },
    imageUrl: { type: String, required: true },
    repeats: { type: Number },
    time: { type: Number }
})

module.exports = model('Exercise', exerciseSchema)