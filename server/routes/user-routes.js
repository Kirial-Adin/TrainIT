const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");


router.get('/getId', userController.getUserIdByToken)
