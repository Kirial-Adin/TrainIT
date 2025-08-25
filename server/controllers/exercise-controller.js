const { validationResult } = require("express-validator");
const exerciseService = require("../services/exercise-service");
const ApiError = require("../exceptions/api-errors");
const mongoose = require("mongoose");

class ExerciseController {
  async createExercise(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { title, complexity, recommendation, type, equipment, measurementType, imageUrl, repeats, time } = req.body;
      const exerciseData = await exerciseService.createExercise(title, complexity, recommendation, type, equipment, measurementType, imageUrl, repeats, time);
      console.log(exerciseData);
      return res.json({ exerciseId: exerciseData._id, ...exerciseData });
    } catch (e) {
      next(e);
    }
  }

  async getExercises(req, res, next) {
    try {
      const exercises = await exerciseService.getExercises();
      return res.json(exercises);
    } catch (e) {
      next(e);
    }
  }

  async getExercisesById(req, res, next) {
    try {
      const { id } = req.params;
      console.log('Received ID:', req.params.id, 'Type:', typeof req.params.id);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid exercise ID' });
      }

      const exercise = await exerciseService.getExercisesById(id);

      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }

      return res.json(exercise);
    } catch (e) {
      next(e);
    }
  }

  async deleteExerciseById (req, res, next) {
    try {
      const { id } = req.params;
      const exercise = await exerciseService.deleteExerciseById(id);
      return res.json(exercise);
    } catch (e) {
      next(e);
    }
  }

  async patchExerciseById (req, res, next) {
    try {
      const { id } = req.params;
      console.log('Received ID:', req.params.id, 'Type:', typeof req.params.id);
      const exercise = await exerciseService.patchExerciseById(id, req.body);

      return res.json(exercise);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ExerciseController();
