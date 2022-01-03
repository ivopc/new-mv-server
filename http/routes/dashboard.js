const express = require("express");
const controller = {
    isConnected: require("../controller/utils/is-connected"),
    selfProfile: require("../controller/dashboard/self-profile"),
    profile: require("../controller/dashboard/profile")
};
const router = express.Router();

router
    .use(controller.isConnected)
    /*.post("/profile", controller.selfProfile)
    .post("/profile/:nickname", controller.profile)
    .post("/premium", controller.premium)
    .post("/config", controller.config);*/

module.exports = router;