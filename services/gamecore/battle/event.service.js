const { setNotBattling } = require("../../../models/current-doing.db");
const { disableMonster } = require("../../../models/monster.db");
const { deleteBattle } = require("../../../models/battle.db");

const { checkAndInsertQuestDefeat, expReward, itemDrop } = require("./reward.service");

const onFainted = {};
onFainted.wild = async (faintedMonsterData, uid) => await onWildFainted(faintedMonsterData, uid)

const onWildFainted = async (faintedMonsterData, uid) => {
    const [
        setCurrentDoing, disableWild, removeBattle,
        insertQuestDefeat, expBattleReward, itemBattleDrop
     ] = await Promise.all([
        setNotBattling(uid),
        disableMonster(faintedMonsterData.id),
        deleteBattle(uid),
        checkAndInsertQuestDefeat(faintedMonsterData, uid),
        expReward(faintedMonsterData, uid),
        itemDrop(faintedMonsterData, uid)
    ]);
    return { continue: false, expBattleReward, itemBattleDrop };
};

const onPlayerLose = async () => {};
const onDraw = async () => {};

module.exports = { onFainted, onPlayerLose, onDraw };