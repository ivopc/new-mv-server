const scripts = [];

// Apply damage
scripts[0] = async function (params) {
	console.log(this.battleId, params);
};

// Apply buff/debuff
scripts[1] = async function (params) {};

// Run (only vs wild)
scripts[2] = async function (params) {};

// Change monster
scripts[3] = async function (params) {};

// Use magic seal (tame wild monster)
scripts[4] = async function (params) {};

// Use heal potion
scripts[5] = async function (params) {};

// Status problem
scripts[6] = async function (params) {};

// Status problem heal
scripts[7] = async function (params) {};

// Raw Damage
scripts[99] = async function (params) {};

module.exports = scripts;