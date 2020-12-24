const { STATUS_PROBLEM } = require("../../../constants/Battle");
const { onFainted } = require("./event.service");

const handleAction = (input, battleData) => {
	// register all turn steps to send to script to run in database
	// and send to client
	const turns = {
		pre: [],
		regular: [],
		post: []
	};
	// active monsters in battle
	const activeMonsters = {
		challenger: battleData.playerMonsters.getFirstAlive(),
		opponent: battleData.wildMonster
	};
	// challenger and opponent actions
	const action = {
		challenger: null,
		opponent: null
	};
	// treat buffs and debuffs in battle
	const buffsDebuffs = {/*{...}*/};
	// treat challenger action
	action.challenger = parseChallengerAction(
		input,
		activeMonsters,
		battleData.playerMonsters,
		buffsDebuffs
	);
    // check if has status problem
    if (activeMonsters.challenger.status_problem > 0)
        handleStatusProblem(activeMonsters.challenger, action.challenger, turns);
    // choose opponent action
	action.opponent = chooseOpponentAction(activeMonsters.opponent);
    // parse opponent action
    action.opponent = parseOpponentAction(
        action.opponent,
        activeMonsters.opponent,
        activeMonsters.challenger,
        buffsDebuffs
    );
    // check if has status problem
    if (activeMonsters.opponent.status_problem > 0)
        handleStatusProblem(activeMonsters.opponent, action.opponent, turns);
    // ** Who attack first?
    switch (action.challenger.fn_name) {
        // all actions who must happend before regular turn
        case "health_potion":
        case "magic_seal":
        case "change_monster":
        case "run":
        {
            turns.pre.push(action.challenger);
            turns.regular.push(action.opponent);
            break;
        };
        default: {
            // when is default we get the monster speed
            if (activeMonsters.challenger.stats_speed * Resources.StatChange.stats[buffsDebuffs.challenger.spe] >= activeMonsters.opponent.stats_speed * Resources.StatChange.stats[buffsDebuffs.opponent.spe]) {
                turns.regular.push(action.challenger);
                turns.regular.push(action.opponent);
            } else {
                turns.regular.push(action.challenger);
                turns.regular.push(action.opponent);
            };
            break;
        };
    };
    // ** Modifiers
    // if the challenger monster is the first to attack and it choosed status problem attack
    if (
        action.challenger.fn_name == "status_problem" && 
        turns.regular.findIndex(action => action.param.attacker_id == player.monster.id) == 0 &&
        action.challenger.param.canDoMove &&
        action.challenger.param.hited
    ) {
        activeMonsters.opponent.status_problem = action.challenger.param.stat;
        handleStatusProblem(activeMonsters.opponent, action.opponent, turns);

        // monster can't wake up in the same turn that it use the move
        if (action.challenger.param.stat == STATUS_PROBLEM.SLEEPING) {
            action.bot.param.canDoMove = false;
        };
    };
    if (turns.regular[0].fn_name == "move_damage" && turns.regular[0].param.hited && turns.regular[0].param.canDoMove) {
        // if the firt hited monster hp is equals to zero remove the move of second attackert
        if (turns.regular[0].param.hp <= 0) {
            delete turns.regular[1];
        };
    };
    // if the player try to run and can run
    if (action.challenger.fn_name == "run" && action.challenger.param === true) {
        // remove the opponent attack
        for (let i = 0; i < turns.regular.length; i++) {
            if (turns.regular[i].id == "opponent")
                delete turns.regular[i];
        };
    };
    // finally we return the all turn data
    return turns;   
};

const parseChallengerAction = (input, activeMonsters, challengerMonsters, buffsDebuffs) => {
    let action;
    switch (input.action) {
        case "move": {
            action = this.handleMove(
                // move
                Resources.Moves[activeMonsters.challenger["move_" + input.param]],
                // attacker = monstro atual do jogador
                activeMonsters.challenger,
                // target = monstro selvagem
                activeMonsters.opponent,
                // buffs&debuffs
                {
                    attacker: buffsDebuffs.challenger,
                    target: buffsDebuffs.opponent
                }
            );
            break;
        };
        // caso tente fugir
        case "run": {
            action = this.handleRun(
                activeMonsters.challenger,
                activeMonsters.opponent
            );
            break;
        };
        // caso escolheu um item
        case "item": {
            action = this.handleItem(
                input.param.item,
                challengerMonsters[input.param.monster]
            );
            break;
        };
        // caso tente mudar o monstro
        case "change": {
            action = {
                fn_name: "change_monster",
                param: {
                    index: input.param,
                    hasExpShare: true
                }
            };
            break;
        };
    };
    return action;
};

const chooseOpponentAction = opponentMonster => {
    let choose = false, move;
    while (!choose) {
        move = opponentMonster["move_" + String(Math.floor(Math.random() * 4))];
        if (move in Resources.Moves)
            choose = true;
    };
    return {
        action: "move",
        param: Resources.Moves[move]
    };
};

const parseOpponentAction = (input, opponentMonster, target, buffsDebuffs) => {
    let action;
    switch (input.action) {
        case "move": {
            action = this.handleMove(
                // move
                input.param,
                // attacker (wildMonster) = current monster
                opponentMonster,
                // target = challender monster
                target,
                // buffs&debuffs
                {
                    attacker: buffsDebuffs.opponent,
                    target: buffsDebuffs.challenger
                }
            );

            break;
        };
        case "run": {
            break;
        };
    };
    return action;
};

const nextTurn = async battleDate => {
    if (data.wildMonster.current_HP <= 0) {
        return await onFainted("wild", battleData.wildMonster);
    };

    if (data.playerMonsters[0].current_HP <= 0) {
        return await onFainted("player", data.playerMonsters[0]);
    };

    return {continue: true};
};


module.exports = { handleAction, nextTurn };