const {Schema, model } = require('mongoose')


const exerciseTrainingsSchema = new Schema({
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    value: { type: Number, required: true },
    goal: { type: Number, required: false },
    measurementType: { type: String, required: true }
})

module.exports = model('ExerciseTrainings', exerciseTrainingsSchema)
