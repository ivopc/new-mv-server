const { getPlayerData } = require("../../services/gamecore/get-home-data.service");
const { filterMonsterList } = require("../../utils");

exports.post = async (req, res) => {};

exports.get = async (req, res) => {

    const { partyMonsters, gameData } = await getPlayerData(req.session["uid"]);

    res.json({
        username: req.session["username"],
        rank: gameData.rank,
        level: gameData.level,
        coins: {
            silver: gameData.silver,
            gold: gameData.gold
        },
        partyMonsters: filterMonsterList(partyMonsters)
    });
};