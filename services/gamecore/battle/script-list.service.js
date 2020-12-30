const { FN_NAMES } = require("../../../constants/Battle");
const { discontHealth, discontMana } = require("../../../models/monster.db");

const scripts = [];

// Apply damage
scripts[FN_NAMES.MOVE_DAMAGE] = async function (params) {
    if (!params.hited || !params.canDoMove) {
        return;
    };
    return await Promise.all([
        discontHealth(params.monsterId, params.damage)
    ]);
};

// Apply buff/debuff
scripts[FN_NAMES.BUFF_DEBUFF] = async function (params) {};

// Run (only vs wild)
scripts[FN_NAMES.RUN] = async function (params) {};

// Change monster
scripts[FN_NAMES.CHANGE_MONSTER] = async function (params) {};

// Use magic seal (tame wild monster)
scripts[FN_NAMES.MAGIC_SEAL] = async function (params) {};

// Use heal potion
scripts[FN_NAMES.HEALTH_POTION] = async function (params) {};

// Status problem
scripts[FN_NAMES.STATUS_PROBLEM] = async function (params) {};

// Status problem heal
scripts[FN_NAMES.HEALED] = async function (params) {};

// Raw Damage
scripts[FN_NAMES.RAW_DAMAGE] = async function (params) {};

module.exports = scripts;