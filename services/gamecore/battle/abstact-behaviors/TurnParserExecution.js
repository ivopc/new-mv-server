const { FN_NAMES } = require("../../../../constants/Battle");

const { promiseWaterfall } = require("../../../../utils");

const turnScriptList = require("../../turn-behaviors-list.service");

class TurnParserExecution {
    constructor (battleId) {
        /**
         * All the behaviors of the current turn that will be executed in runtime to parse the data to database
         * and sended as JSON to gameclient to render the turns results
         * @type {Array<turnScriptList>}
         */
        this.behaviorList = [];
        /**
         * Current battle ID
         */
        this.battleId = battleId;
        /**
         * User Id of the player or in a PvP the challenger battle
         * @type {number}
         */
        this.userId;
    }

    setUserId (userId) {
        this.userId = userId;
    }

    codeParser (scripts) {
        this.behaviorList = scripts.map(script => {
            const params = treatParams[script.fnName](script);
            return async () => await this.callBehavior(script.fnName, params);
        });
    }

    async exec () {
        return await promiseWaterfall(this.behaviorList);
    }

    callBehavior (name, params) {
        return turnScriptList[name].bind(this)(params);
    }
};

module.exports = TurnParserExecution;