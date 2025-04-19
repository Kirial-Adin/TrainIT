const {Schema, model } = require ('mongoose')
const exerciseSchema = require('./exercise-model')

const workoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    complexity: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    type: { type: String, enum: ['cardio', 'strength', 'hybrid'] },
    duration: { type: Number }, // в минутах
    compleated: { type: Boolean, default: false },
    exercises: [exerciseSchema],
    imageUrl: { type: String },
    isDefault: { type: Boolean, default: false } // маркер предзагруженной тренировки
  });
  
  export default model('Workout', workoutSchema);