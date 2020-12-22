const express = require("express");
const controller = {
    isConnected: require("../controller/utils/is-connected"),
    checkBlockPages: require("../controller/gamecore/check-block-pages")

};
const router = express.Router();

router
    //.use(controller.isConnected)
    .use(controller.checkBlockPages)

    .post("/home", (req, res) => {})
    .post("/team", (req, res) => {})
    .post("/hunt", (req, res) => {})
    .post("/city", (req, res) => {})
    .post("/bag", (req, res) => {})
    .post("/recovery", (req, res) => {})
    .post("/market", (req, res) => {})
    .post("/jobs", (req, res) => {})
    .post("/marketplace", (req, res) => {})
    .post("/bank", (req, res) => {})
    .post("/storagemarket", (req, res) => {})
    .post("/captcha", (req, res) => {
        res.json({captcha: true, rand: Date.now()});
    })
    .post("/initialmonster", (req, res) => {})
    .post("/learn", (req, res) => {})
    .post("/evolve", (req, res) => {});

module.exports = router;