const express = require("express");
const controller = require("../controller/account");
const router = express.Router();

router
    .post("/register", controller.register)
    .post("/login", controller.login)
    .post("/logout", controller.logout)
    .post("/settings", controller.settings);

module.exports = router;