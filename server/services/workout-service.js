const WorkoutModel = require("../models/workout-model.js");
const WorkoutDTO = require("../dtos/workout-dto.js");

class WorkoutService {
  async createWorkout(
    title,
    complexity,
    recommendation,
    type,
    equipment,
    measurementType,
    imageUrl,
    repeats,
    time,
    exercises
  ) {
    const workoutModel = WorkoutModel.create({
      title,
      complexity,
      recommendation,
      type,
      equipment,
      measurementType,
      imageUrl,
      repeats,
      time,
      exercises,
    });
    const workoutDTO = new WorkoutDTO(workoutModel);

    return {
      workout: workoutDTO,
    };
  }

  async getWorkouts() {
    const workouts = await WorkoutModel.find();
    return workouts;
  }
  async getWorkoutsById(id) {
    const workout = await WorkoutModel.findById(id);
    return workout;
  }
  async deleteWorkoutById(id) {
    const workout = await WorkoutModel.findByIdAndDelete(id);
    return workout;
  }
  async patchWorkoutById(id, completed) {
    console.log('Сервис:','Обновляем workout с id:', id, 'и данными:', completed);
    try {
      const workout = await WorkoutModel.findByIdAndUpdate(id, completed, {
        new: true,
      });
      return workout;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

module.exports = new WorkoutService();
