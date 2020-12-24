const scriptList = require("./script-list.service");

class Script {

    fns = scriptList;

    constructor (battleId) {
        this.fnList = [];
        this.battleId = battleId;
    }

    codeParser (scripts) {}

    async exec () {
        this.callFn(0, "olá");
    }

    callFn (id, params) {
        return await this.fns[id].bind(this)(params);
    }
};

module.exports = Script;