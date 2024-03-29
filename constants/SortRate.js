const { MONSTER_RARITY } = require("./Monster");

const WILD_MONSTER_POSSIBILITIES = {
    "0..17000": MONSTER_RARITY.COMMON,
    "17001..22000": MONSTER_RARITY.UNCOMMON,
    "22001..24900": MONSTER_RARITY.RARE,
    "24901..25000": MONSTER_RARITY.SUPER_RARE
};

module.exports = { WILD_MONSTER_POSSIBILITIES };