const ACTIONS = {
	MOVE: "move",
	ITEM: "item",
	SWITCH_MONSTER: "switchmonster",
	RUN: "run"
};

exports.post = async (req, res) => {

	switch (req.query["action"]) {
		case ACTIONS.MOVE: {break;};
		case ACTIONS.ITEM: {break;};
		case ACTIONS.SWITCH_MONSTER: {break;};
		case ACTIONS.RUN: {break;};
	};
	
	res.json({test: true});
};