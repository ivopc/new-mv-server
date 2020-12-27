const checkAndInsertQuestDefeat = async () => {};
const expReward = async (faintedMonsterData, uid) => {
    const expReward = Resources.Formulas.Exp.Calc.battleExpReward({
        battle: {
            trainerOrWild: 1,
            isHoldingLuckyEgg: 1
        },
        number: 1,
        opponent: {
            level: faintedMonsterData.level,
            expbase: Resources.Dex[faintedMonsterData.monsterpedia_id].expbase
        }
    });

    return await giveExpRaw(expReward, 1);
};
const giveExpRaw = async () => {};
const addExpShareToMonster = async () => {};
const removeExpShareToMonster = async () => {};
const coinReward = async () => {};
const itemDrop = async () => {};

module.exports = {
    checkAndInsertQuestDefeat, expReward, giveExpRaw, addExpShareToMonster,
    removeExpShareToMonster, coinReward, itemDrop
};


