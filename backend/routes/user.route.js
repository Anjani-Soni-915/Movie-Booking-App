const OAuth = require("../config/token");
const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();

router.post("/", userController.createUser);

router.post("/login", userController.loginUser);

router.post("/google-login", userController.googleLogin);

router.get("/", OAuth, userController.getUsers);

router.get("/:id", OAuth, userController.getUserById);

router.put("/:id", OAuth, userController.updateUser);

router.delete("/:id", OAuth, userController.deleteUser);
module.exports = router;
