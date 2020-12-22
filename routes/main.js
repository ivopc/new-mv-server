const express = require("express");
const router = express.Router();

const mainRouter = require("../controller/main");

const isConnected = require("../controller/utils/is-connected-render-route");

router
	.all("/", mainRouter)

	//.use(isConnected)
	.get("/profile/:nickname", mainRouter)
	.get("/profile", mainRouter)
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

	.get("/captcha", mainRouter)
	.get("/initialmonster", mainRouter)
	.get("/learn", mainRouter)
	.get("/evolve", mainRouter)

module.exports = router;