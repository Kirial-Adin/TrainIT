const exerciseService = require("../services/exercise-service");
const ApiError = require("../exceptions/api-errors");

class ExerciseController {
  async createExercise(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { title, complexity, recommendation, type, equipment, measurementType, imageUrl, repeats, time } = req.body;
      const exerciseData = await exerciseService.createExercise(title, complexity, recommendation, type, equipment, measurementType, imageUrl, repeats, time);
      return res.json(exerciseData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ExerciseController();
