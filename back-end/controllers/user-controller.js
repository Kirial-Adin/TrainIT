import { validationResult } from "express-validator";
import login from "../services/user-services.js";
import registration from "../services/user-services.js";
import logout from "../services/user-services.js";
import refresh from "../services/user-services.js";
import ApiError from "../exceptions/api-errors.js";


class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password, weight, height, experience, trainingGoal } = req.body;
      const userData = await registration(email, password, weight, height, experience, trainingGoal);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict' 
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
