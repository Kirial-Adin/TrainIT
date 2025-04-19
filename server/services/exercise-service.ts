const exerciseModel = require("../models/exercise-model");
const ExerciseDTO = require("../dtos/exercise-dto");

class ExerciseService {
  async createExercise(
    title: any,
    complexity: string,
    recommendation: string,
    type: string,
    equipment: string,
    measurementType: string,
    imageUrl: string,
    repeats?: number,
    time?: number
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
