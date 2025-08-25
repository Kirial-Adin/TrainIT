const { Schema, model } = require("mongoose");
const exerciseTrainingsSchema = require("./exerciseTrainings-model").schema;

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  complexity: { type: String, enum: ["beginner", "intermediate", "advanced"] },
  type: { type: String, enum: ["cardio", "strength", "hybrid"] },
  completed: { type: Boolean, default: false },
  exercises: [exerciseTrainingsSchema],
  imageUrl: { type: String },
  time: { type: String },
  isDefault: { type: Boolean, default: false },
});

module.exports = model("Workout", workoutSchema);
