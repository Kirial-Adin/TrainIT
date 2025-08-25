const { validationResult } = require("express-validator");
const WorkoutService = require("../services/workout-service.js");
const ApiError = require("../exceptions/api-errors");
const mongoose = require("mongoose");

class WorkoutController {
  async createWorkout(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }

      const { title, complexity, recommendation, type, equipment, measurementType, imageUrl, repeats, time, exercises } = req.body;
      console.log(req.body.exercises);
      const workoutData = await WorkoutService.createWorkout(title, complexity, recommendation, type, equipment, measurementType, imageUrl, repeats, time, exercises);
      return res.json(workoutData);
    } catch (err) {
      next(err);
    }
  }

  async getWorkouts(req, res, next) {
    try {
      const workouts = await WorkoutService.getWorkouts();
      return res.json(workouts);
    } catch (err) {
      next(err);
    }
  }

  async getWorkoutsById(req, res, next) {
    try {
      const { id } = req.params
      console.log('Received ID:', req.params.id, 'Type:', typeof req.params.id);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid workout ID' });
      }

      const workout = await WorkoutService.getWorkoutsById(id);

      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }

      return res.json(workout);

    } catch (err) {
      next(err);
    }
  }

  async deleteWorkoutById(req, res, next) {
    try {
      const { id } = req.params;

      const workout = await WorkoutService.deleteWorkoutById(id);
      return res.json(workout);
    } catch (err) {
      next(err);
    }
  }

  async patchWorkoutById(req, res, next) {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      console.log('Контреллер:','Обновляем workout с id:', id, 'и данными:', completed);
      const workout = await WorkoutService.patchWorkoutById(id, req.body);
      return res.json(workout);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new WorkoutController();
