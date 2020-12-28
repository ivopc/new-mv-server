const { FN_NAMES } = require("../../../constants/Battle");

const { 
	applyDamage, 
	applyStatusProblem, 
	applyAccuracy, 
	tryTameMonster
} = require("./formula.service");

const handleMove = (move, attacker, target, buffsDebuffs) => {
	const action = {};
	switch (move.category) {
		case "Normal":
		case "Magic":
		{
			action.fnName = FN_NAMES.MOVE_DAMAGE;
			action.param = applyDamage(move, attacker, target, {
				attacker: buffsDebuffs.attacker.atk,
				target: buffsDebuffs.target.def
			});
			action.param.hited = applyAccuracy(move, buffsDebuffs.attacker.accuracy);
			action.param.canDoMove = true;
			action.param.moveId = move.id;
			action.param.attackerId = attacker.id;
			break;
		};
        case "Status": {
            action.fnName = FN_NAMES.BUFF_DEBUFF;
            action.param = {};
            action.param.hited = applyAccuracy(move, buffsDebuffs.attacker.accuracy);
            action.param.canDoMove = true;
			action.param.moveId = move.id;
			action.param.attackerId = attacker.id;
            action.param.effectTarget = move.target;
            let moveTarget;
            switch (move.target) {
                case "opponent": {
                    moveTarget = target;
                    break;
                };
                case "self": {
                    moveTarget = attacker;
                    break;
                }; 
            };
            action.param.effect = move.boosts.map(boost => ({
                target: moveTarget.id,
                value: boost.value,
                stat: boost.stat
            }));
            break;
        };
        case "StatusProblem": {
            action.fnName = FN_NAMES.STATUS_PROBLEM;
            action.param = applyStatusProblem(
                // movimento
                move,
                // quem atacou
                attacker,
                // mirou em quem
                target
            );
            action.param.hited = applyAccuracy(move, buffsDebuffs.attacker.accuracy);
            action.param.canDoMove = true;
            action.param.moveId = move.id;
            action.param.attackerId = attacker.id;
            break;
        };
	};
	return action;
};
const handleItem = () => {};
const handleRun = () => {};
const handleStatusProblem = () => {};

module.exports = { handleMove, handleItem, handleRun, handleStatusProblem };