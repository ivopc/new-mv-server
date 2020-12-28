const { BATTLE_TYPES, ERRORS, FN_NAMES } = require("../../../constants/Battle");
const { promiseWaterfall } = require("../../../utils");

const { bootBattleAction } = require("./init.service");

const vsWildAction = require("./vs-wild-action.service");
const vsTamerAction = require("./vs-tamer-action.service");
const vsPlayerAction = require("./vs-player-action.service");

const Script = require("./script.service");

const battleTypesAction = {
    [BATTLE_TYPES.WILD]: () => vsWildAction,
    [BATTLE_TYPES.TAMER]: () => vsTamerAction,
    [BATTLE_TYPES.PVP]: () => vsPlayerAction
};

const main = async (uid, input) => {
    const battleData = await bootBattleAction(uid, input);
    if (battleData.error) {
        return {error: ERRORS.PLAYER_ALREADY_DOING_ACTION};
    };
    const action = battleTypesAction[battleData.battleType]();
    const turnData = action.handleAction(input, battleData);
    await execTurnActions(battleData.battleData, uid, turnData);
    const newBattleData = await bootBattleAction(uid, input);
    const nextTurnData = await action.nextTurn(newBattleData, turnData, uid);
    if (nextTurn.continue) {
        return turnData;
    } else {
        finishBattle(turnData);
        return turnData;
    };
};

const execTurnActions = async ({ id }, uid, { pre, regular, post }) => {
    const script = {
        pre: new Script(id),
        regular: new Script(id),
        post: new Script(id)
    };
    script.pre.codeParser(pre);
    script.regular.codeParser(regular);
    script.post.codeParser(post);
    await promiseWaterfall([
        async () => await script.pre.exec(),
        async () => await script.regular.exec(),
        async () => await script.post.exec()
    ]);
};

const finishBattle = (uid, turnData) => {
    turnData.post.push({
        fnName: FN_NAMES.FAINTED,
        param: {
            target: "wild" 
        }
    });
};

// ;(async () => {
//     const script = new Script(1);
//     script.codeParser([
//         {name: "Ivo"},
//         {name: "Red"},
//         {name: "Tomaticru"}
//     ]);
//     await script.exec();
//     console.log("End");
// })();

module.exports = main;