const express = require("express");
const router = express.Router();

const mainRouter = require("../controller/main");

const isConnected = require("../controller/utils/is-connected-render-route");

router
	.get("/", mainRouter)
	
	.get("/profile/:nickname", mainRouter)
	.get("/profile", mainRouter)
	.get("/premium", mainRouter)

	.use(isConnected)
	.get("/config", mainRouter)
	.get("/team", mainRouter)
	.get("/marketplace", mainRouter)


module.exports = router;