const { hasInitial, insertInitialMonsterFlag, giveInitialMonster } = require("../../services/gamecore/get-initial-monster.service");

module.exports = async (req, res) => {
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