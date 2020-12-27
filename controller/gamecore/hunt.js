const { 
    createBattle, generateRandomWild, insertWildMonster, 
    getPlayerPartyMonster, setUserBattlingVsWild 
} = require("../../services/gamecore/hunt.service");

const { BATTLE_TYPES } = require("../../constants/Battle");

exports.get = (req, res) => {
    res.json({ok: true});
};

exports.post = async (req, res) => {
    // const zone = req.query["zone"];
    const { uid } = req.session;
    const newWildMonster = generateRandomWild(/*undefined, zone*/);
    await Promise.all([
        createBattle(uid),
        insertWildMonster(uid, newWildMonster),
        getPlayerPartyMonster(uid),
        setUserBattlingVsWild(uid)
    ]);
    res.json({success: true});
};