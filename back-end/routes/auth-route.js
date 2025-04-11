import { Router } from "express";
const router = new Router();
import login from "../controllers/user-controller.js";
import registration from "../controllers/user-controller.js";
import logout from "../controllers/user-controller.js";
import refresh from "../controllers/user-controller.js";
import { body } from "express-validator";

router.post(
  "/registration",
  [
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
  ],
  async (req, res, next) => {
    try { 
       registration;
    } catch (e) { console.log(e); }
  }
);
router.post("/login", function (req, res, next) {
  login;
});
router.post("/logout", function (req, res, next) {
  logout;
});
router.get("/refresh", function (req, res, next) {
  refresh;
});

export default router;
