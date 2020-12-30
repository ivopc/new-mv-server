const { BATTLE_TYPES, ACTIONS, ERRORS } = require("../../constants/Battle");

const { onEnterIdle } = require("../../services/gamecore/battle/init.service");
const main = require("../../services/gamecore/battle/main.service");


exports.get = async (req, res) => {
    const initialData = await onEnterIdle(req.session["uid"]);
    if (initialData.battling === false) {
        res.json({redirect: true});
        return;
    };
    switch (initialData.battleData.battle_type) {
        case BATTLE_TYPES.WILD: {
            res.json({
                playerMonsters: initialData.playerMonsters,
                battle: initialData.battleData, 
                wild: initialData.wildMonster,
                buffsDebuffs: initialData.buffsDebuffs
            });
            break;
        };
    };
};

exports.post = async (req, res) => {
    let response;
    switch (req.body["action"]) {
        case ACTIONS.MOVE: {
            response = await main(req.session["uid"], {
                action: ACTIONS.MOVE,
                param: req.body["param"]
            });
            break;
        };
        case ACTIONS.ITEM: {break;};
        case ACTIONS.SWITCH_MONSTER: {break;};
        case ACTIONS.RUN: {break;};
        default: {
            response = {
                error: ERRORS.EMPTY_ACTION
            };
            break;
        };
    };
    res.json(response);
};