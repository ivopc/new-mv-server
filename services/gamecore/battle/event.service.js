const { setNotBattling } = require("../../../models/current-doing.db");
const { disableMonster } = require("../../../models/monster.db");
const { deleteBattle } = require("../../../models/battle.db");

const { checkAndInsertQuestDefeat, expReward, itemDrop } = require("./reward.service");

const onWildFainted = async (faintedMonsterData, userId) => {
    const [
        setCurrentDoing,
        disableWild,
        removeBattle,
        insertQuestDefeat,
        expBattleReward,
        itemBattleDrop
     ] = await Promise.all([
        setNotBattling(userId),
        disableMonster(faintedMonsterData.id),
        deleteBattle(userId),
        checkAndInsertQuestDefeat(faintedMonsterData, userId),
        expReward(faintedMonsterData, userId),
        itemDrop(faintedMonsterData, userId)
    ]);
    return { continue: false, expBattleReward, itemBattleDrop };
};

const onPlayerFainted = async () => {};

const onPlayerLose = async () => {};
const onDraw = async () => {};

module.exports = { onWildFainted, onPlayerFainted, onPlayerLose, onDraw };