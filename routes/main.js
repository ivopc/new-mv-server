const express = require("express");
const router = express.Router();

const mainRouter = require("../controller/main");

router
	.all("/", mainRouter)
	.get("/map", mainRouter)
	.get("/inventory", mainRouter)
	.get("/profile", mainRouter)
	.get("/create", mainRouter)
	.get("/statistics", mainRouter)
	.get("/hunt", mainRouter)
	.get("/monster/:id", mainRouter)
	.get("/jobs", mainRouter)
	.get("/city", mainRouter)
	.get("/messages", mainRouter)
	.get("/premium", mainRouter)
	.get("/reports", mainRouter);

module.exports = router;

/*
--/manage
--/diplomacy
--/options
--/forum
--/buy
--/vouchers
--/advantages
*/