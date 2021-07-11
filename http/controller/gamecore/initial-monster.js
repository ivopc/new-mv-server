const { hasInitial, insertInitialMonsterFlag, giveInitialMonster } = require("../../services/gamecore/get-initial-monster.service");

// when entener in page (prevents to enter if already have initial monster)
exports.get = async (req, res) => {
    const checkIfHasInitalMonster = await hasInitial(req.session["uid"]);
    if (checkIfHasInitalMonster) {
        res.status(401).json({alreadyHaveInitialMonster: true});
        return;
    };
    res.json({success: true});
};

// request to get the initial monster
exports.post = async (req, res) => {
    // checking if already have iinitial monster, if has prevent to continue
    const checkIfHasInitalMonster = await hasInitial(req.session["uid"]);
    if (checkIfHasInitalMonster) {
        res.status(401).json({alreadyHaveInitialMonster: true});
        return;
    };
    // insert initial monster flag and give initial monster to player
    await Promise.all([
        insertInitialMonsterFlag(req.session["uid"]),
        giveInitialMonster(req.session["uid"], {
            monsterpedia_id: req.body["monsterId"],
            level: 5
        })
    ]);
    // send response that's all ok to client
    res.json({test: true, monster: req.body["monsterId"]});
};

