const BATTLE_TYPES = {
	WILD: 1,
	TAMER: 2,
	PVP: 3
};

const ACTIONS = {
    MOVE: "move",
    ITEM: "item",
    SWITCH_MONSTER: "switchmonster",
    RUN: "run"
};

const ERRORS = {
	PLAYER_ALREADY_DOING_ACTION: 1,
    EMPTY_ACTION: 2
};

const STATUS_PROBLEM = {
	PARALYZED: 1,
	POISONED: 2,
	SLEEPING: 5
};

const FN_NAMES = {
    MOVE_DAMAGE: 0,
    BUFF_DEBUFF: 1,
    RUN: 2,
    CHANGE_MONSTER: 3,
    MAGIC_SEAL: 4,
    HEALTH_POTION: 5,
    STATUS_PROBLEM: 6,
    HEALED: 7,
    RAW_DAMAGE: 99,
    FAINTED: 100
};

module.exports = { BATTLE_TYPES, ACTIONS, ERRORS, STATUS_PROBLEM, FN_NAMES };