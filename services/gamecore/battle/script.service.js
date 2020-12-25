const { FN_NAMES } = require("../../../constants/Battle");

const { promiseWaterfall } = require("../../../utils");

const scriptList = require("./script-list.service");

class Script {

    fns = scriptList;

    constructor (battleId, uid) {
        this.fnList = [];
        this.battleId = battleId;
        this.uid = uid;
    }

    codeParser (scripts) {
        this.fnList = scripts.map(script => this.rawCodeParser(script));
    }

    rawCodeParser (script) {
        let params;
        switch(script.fnName) {
            case FN_NAMES.MOVE_DAMAGE: {
                params = {
                    monsterId: script.target.data.id,
                    hp: script.param.hp,
                    damage: script.param.damage,
                    moveId: script.param.moveId,
                    attackerId: script.param.attackerId,
                    hited: script.param.hited,
                    canDoMove: script.param.canDoMove
                };
                break;
            };
        };
        return async () => await this.callFn(script.fnName, params)
    }

    async exec () {
        return await promiseWaterfall(this.fnList);
    }

    callFn (name, params) {
        return this.fns[name].bind(this)(params);
    }
};

module.exports = Script;