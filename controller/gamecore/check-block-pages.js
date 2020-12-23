const dontNeedToAuth = ["captcha", "initialmonster"];

const { checkBlockPages } = require("../../services/main/check-block-pages.service");
const BLOCKPAGES = require("../../constants/BlockPages");

module.exports = async (req, res, next) => {
    if (dontNeedToAuth.includes(req.path.split("/")[1])) {
    	next();
    	return;
    };
    const checkBlockPag = await checkBlockPages(req.session["uid"]);
    switch (checkBlockPag) {
    	case BLOCKPAGES.CAPTCHA: {
    		res.status(401).json({error: BLOCKPAGES.ERROR, blockPage: BLOCKPAGES.CAPTCHA});
    		break;
    	};
    	case BLOCKPAGES.INITIAL_MONSTER: {
    		res.status(401).json({error: BLOCKPAGES.ERROR, blockPage: BLOCKPAGES.INITIAL_MONSTER});
    		break;
    	};
    	default: {
    		next();
    		break;
    	};
    };
};