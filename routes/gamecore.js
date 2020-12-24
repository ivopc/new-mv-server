const express = require("express");
const controller = {
    isConnected: require("../controller/utils/is-connected"),
    checkBlockPages: require("../controller/gamecore/check-block-pages"),
    home: require("../controller/gamecore/home"),
    battle: require("../controller/gamecore/battle"),
    initialMonster: require("../controller/gamecore/initial-monster")
};
const router = express.Router();

router
    .use(controller.isConnected)
    .use(controller.checkBlockPages)

    .get("/home", controller.home.get)
    .get("/team", (req, res) => {})
    .get("/hunt", (req, res) => {})
    .post("/battle", controller.battle.post)
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
    .get("/initialmonster", controller.initialMonster.get)
    .post("/initialmonster", controller.initialMonster.post)
    .get("/learn", (req, res) => {})
    .get("/evolve", (req, res) => {});

module.exports = router;