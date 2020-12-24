const { BATTLE_TYPES, ERRORS } = require("../../../constants/Battle");
const { promiseWaterfall } = require("../../../utils");

const { getInitialBattleData } = require("./init.service");

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
    const battleData = await getInitialBattleData(uid, input);
    if (battleData.error) {
        return {error: ERRORS.PLAYER_ALREADY_DOING_ACTION};
    };
    const action = battleTypesAction[battleData.battleType]();
    const turnData = action.handleAction(input, battleData);
    await execTurnActions(battleData.battleData, turnData);
    const newBattleData = await getInitialBattleData(uid, input);
    const nextTurnData = await action.nextTurn(newBattleData);
    if (nextTurn.continue) {
        return turnData;
    };
    if (nextTurn.dontContinue) {
        
    };
};

const execTurnActions = async ({ id }, { pre, regular, post }) => {
    const script = {
        pre: new Script(id),
        regular: new Script(id),
        post: new Script(id)
    };
    script.pre.codeParser(pre);
    script.regular.codeParser(regular);
    script.post.codeParser(post);
    await promiseWaterfall([
        () => await script.pre.exec(),
        () => await script.regular.exec(),
        () => await script.post.exec()
    ]);
};

module.exports = main;