// const exerciseModel = require("../models/exercise-model.js");
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
    const exercise = exerciseModel.create(
        title,
        complexity,
        recommendation,
        type,
        equipment,
        measurementType,
        imageUrl,
        repeats,
        time);
    
    const exerciseDTO = new ExerciseDTO(exercise);

    return {
      exercise: exerciseDTO,
    }
  }

}
