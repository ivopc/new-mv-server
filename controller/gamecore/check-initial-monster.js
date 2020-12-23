const { hasInitial } = require("../../services/gamecore/get-initial-monster.service");

module.exports = async (req, res) => {
    const checkIfHasInitalMonster = await hasInitial(req.session["uid"]);
    if (checkIfHasInitalMonster) {
        res.status(401).json({alreadyHaveInitialMonster: true});
        return;
    };

    res.json({success: true});
};