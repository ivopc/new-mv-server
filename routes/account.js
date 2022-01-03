const { Router } = require("express");
const controller = require("../controller/account");
const router = Router();

router
    .post("/register", controller.register)
    .post("/login", controller.login)
    .post("/logout", controller.logout)
    .post("/settings", controller.settings);

module.exports = router;