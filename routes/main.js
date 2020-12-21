const express = require("express");
const router = express.Router();

const mainRouter = require("../controller/main");

router
	.all("/", mainRouter)
	.get("/profile", mainRouter)
	.get("/profile/:nickname", mainRouter)
	.get("/premium", mainRouter)
	.get("/config", mainRouter)

	.get("/team", mainRouter)
	.get("/hunt", mainRouter)
	.get("/city", mainRouter)
	.get("/bag", mainRouter)
	.get("/recovery", mainRouter)
	.get("/market", mainRouter)
	.get("/jobs", mainRouter)
	.get("/marketplace", mainRouter)
	.get("/bank", mainRouter)
	.get("/storagemarket", mainRouter)
	.get("/premium", mainRouter)

	.get("/captcha", mainRouter)
	.get("/initialmonster", mainRouter)
	.get("/learn", mainRouter)
	.get("/evolve", mainRouter)

module.exports = router;