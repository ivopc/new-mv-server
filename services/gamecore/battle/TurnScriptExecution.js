const { FN_NAMES } = require("../../../constants/Battle");

const { promiseWaterfall } = require("../../../utils");

const turnScriptList = require("./turn-script-list.service");

const treatParams = {
    [FN_NAMES.MOVE_DAMAGE]: script => ({
        monsterId: script.target.id,
        hp: script.param.hp,
        damage: script.param.damage,
        moveId: script.param.moveId,
        attackerId: script.param.attackerId,
        hited: script.param.hited,
        canDoMove: script.param.canDoMove
    })
};

class TurnScriptExecution {

    constructor (battleId) {
        this.fnList = [];
        this.battleId = battleId;
        this.userId;
    }

    setUserId (userId) {
        this.userId = userId;
    }

    codeParser (scripts) {
        this.fnList = scripts.map(script => {
            const params = treatParams[script.fnName](script);
            return async () => await this.callFn(script.fnName, params);
        });
    }

    async exec () {
        return await promiseWaterfall(this.fnList);
    }

    callFn (name, params) {
        return turnScriptList[name].bind(this)(params);
    }
};

module.exports = TurnScriptExecution;