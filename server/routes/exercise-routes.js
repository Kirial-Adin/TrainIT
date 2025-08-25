const Router = require("express").Router;
const router = new Router();
const exerciseController = require("../controllers/exercise-controller");
const { body } = require("express-validator");

router.post(
    "/create-exercise",
    body("title").isString().trim().notEmpty(),
    body("complexity").isString().trim().notEmpty(),
    body("recommendation").isString().trim().notEmpty(),
    body("type").isString().trim().notEmpty(),
    body("equipment").isString().trim().notEmpty(),
    body("measurementType").isString().trim().notEmpty(),
    body("imageUrl").isString().trim().notEmpty(),
    body("repeats").isNumeric().trim().optional({ checkFalsy: true }),
    body("time").isNumeric().trim().optional({ checkFalsy: true }),
    exerciseController.createExercise
)
router.get(
    "",
    exerciseController.getExercises
)
router.get(
  "/:id",
  exerciseController.getExercisesById
)

router.delete(
  "/:id",
  exerciseController.deleteExerciseById
)

router.patch(
  "/:id",
  body("title").isString().trim().optional({ checkFalsy: true }),
  body("complexity").isString().trim().optional({ checkFalsy: true }),
  body("recommendation").isString().trim().optional({ checkFalsy: true }),
  body("type").isString().trim().optional({ checkFalsy: true }),
  body("equipment").isString().trim().optional({ checkFalsy: true }),
  body("measurementType").isString().trim().optional({ checkFalsy: true }),
  body("imageUrl").isString().trim().optional({ checkFalsy: true }),
  body("repeats").isNumeric().trim().optional({ checkFalsy: true }),
  body("time").isNumeric().trim().optional({ checkFalsy: true }),
  exerciseController.patchExerciseById
)

module.exports = router;
