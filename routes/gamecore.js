const express = require("express");
const controller = {
    isConnected: require("../controller/utils/is-connected"),
    checkBlockPages: require("../controller/gamecore/check-block-pages"),
    chooseInitialMonster: require("../controller/gamecore/choose-initial-monster"),
    checkInitialMonster: require("../controller/gamecore/check-initial-monster")
};
const router = express.Router();

router
    .use(controller.isConnected)
    .use(controller.checkBlockPages)

    .get("/home", (req, res) => {
        res.json({
            username: req.session["username"],
            level: 500
        })
    })
    .get("/team", (req, res) => {})
    .get("/hunt", (req, res) => {})
    .get("/city", (req, res) => {})
    .get("/bag", (req, res) => {})
    .get("/recovery", (req, res) => {})
    .get("/market", (req, res) => {})
    .get("/jobs", (req, res) => {})
    .get("/marketplace", (req, res) => {})
    .get("/bank", (req, res) => {})
    .get("/storagemarket", (req, res) => {})
    .get("/captcha", (req, res) => {
        res.json({captcha: true, rand: Date.now()});
    })
    .post("/initialmonster", controller.chooseInitialMonster)
    .get("/initialmonster", controller.checkInitialMonster)
    .get("/learn", (req, res) => {})
    .get("/evolve", (req, res) => {});

module.exports = router;