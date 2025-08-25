const exerciseModel = require("../models/exercise-model.js");
const ExerciseDTO = require("../dtos/exercise-dto");

class ExerciseService {
  async createExercise(
    title,
    complexity,
    recommendation,
    type,
    equipment,
    measurementType,
    imageUrl,
    repeats,
    time
  ) {
    const exercise = exerciseModel.create({
      title,
      complexity,
      recommendation,
      type,
      equipment,
      measurementType,
      imageUrl,
      repeats,
      time,
    });
    const exerciseDTO = new ExerciseDTO(exercise);

    return exercise
  }
  async getExercises() {
    const exercises = await exerciseModel.find();
    return exercises;
  }
  async getExercisesById(id) {
    const exercise = await exerciseModel.findById(id);
    return exercise;
  }
  async deleteExerciseById(id) {
    const exercise = await exerciseModel.findByIdAndDelete(id);
    return exercise;
  }

  async patchExerciseById(
    id,
    title,
    complexity,
    recommendation,
    type,
    equipment,
    measurementType,
    imageUrl,
    repeats,
    time
  ) {
    const exercise = await exerciseModel.findByIdAndUpdate(
      id,
      title,
      complexity,
      recommendation,
      type,
      equipment,
      measurementType,
      imageUrl,
      repeats,
      time,
      {
        new: true,
      }
    );

    return exercise;
  }
}

module.exports = new ExerciseService();
