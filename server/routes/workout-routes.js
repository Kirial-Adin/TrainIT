const Router = require("express").Router;
const router = new Router();
const workoutController = require("../controllers/workout-controller");
const { body } = require("express-validator");

router.post(
  "/create-training",
  body("title").isString().trim().notEmpty(),
  body("complexity").isString().trim().notEmpty(),
  body("description").isString().trim().notEmpty(),
  body("type").isString().trim().notEmpty(),
  body("imageUrl").isString().trim().notEmpty(),
  body("exercises").notEmpty(),
  workoutController.createWorkout
);

router.get("", workoutController.getWorkouts);

router.get("/:id", workoutController.getWorkoutsById);

router.delete("/:id", workoutController.deleteWorkoutById);

router.patch(
  "/:id",
  body("completed").isBoolean().notEmpty(),
  workoutController.patchWorkoutById
);

module.exports = router;
