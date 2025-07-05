const Router = require("express").Router;
const router = new Router();
const exerciseController = require("../controllers/exercise-controller");
const { body } = require("express-validator");

router.post(
    'create-exercise',
    body("title").isString().trim().notEmpty(),
    body("complexity").isString().trim().notEmpty(),
    body("recommendation").isString().trim().notEmpty(),
    body("type").isString().trim().notEmpty(),
    body("equipment").isString().trim().notEmpty(),
    body("measurementType").isString().trim().notEmpty(),
    body("imageUrl").isString().trim().notEmpty(),
    body("repeats").isNumeric().trim().notEmpty(),
    body("time").isNumeric().trim().notEmpty(),
    exerciseController.createExercise
)

module.exports = router;
