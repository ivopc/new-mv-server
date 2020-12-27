const dontNeedToAuth = ["captcha", "initialmonster", "battle"];

const { checkBlockPages } = require("../../services/main/check-block-pages.service");
const BLOCKPAGES = require("../../constants/BlockPages");

module.exports = async (req, res, next) => {
    if (dontNeedToAuth.includes(req.path.split("/")[1])) {
    	next();
    	return;
    };
    const checkBlockPag = await checkBlockPages(req.session["uid"]);
    switch (checkBlockPag) {
    	case BLOCKPAGES.CAPTCHA: 
        case BLOCKPAGES.INITIAL_MONSTER:
        case BLOCKPAGES.BATTLING:
        {
    		res.status(401).json({error: BLOCKPAGES.ERROR, blockPage: checkBlockPag});
    		break;
        };
    	default: {
    		next();
    		break;
    	};
    };
};