const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail().withMessage("Некорректный email"),
  body("password")
    .isLength({ min: 3, max: 32 })
    .withMessage("Пароль должен быть от 3 до 32 символов"),
  body("weight")
    .isFloat({ min: 30, max: 300 })
    .withMessage("Введите корректный вес (30-300 кг)"),
  body("height")
    .isFloat({ min: 100, max: 250 })
    .withMessage("Введите корректный рост (100-250 см)"),
  body("experience").isString().trim().notEmpty(),
  body("trainingGoal").isString().trim().notEmpty(),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

module.exports = router;
