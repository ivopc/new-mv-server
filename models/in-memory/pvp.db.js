const insert = data => {};

const get = battleId => {};

const update = async (battleId, updateData) => {
    const currentBattleData = await get(battleId);
};

const remove = battleId => {};

module.exports = { insert, get, update, remove };