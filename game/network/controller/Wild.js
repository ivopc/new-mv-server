const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../../constants/GameNetwork");

const { search, startBattle } = require("../../../services/gamecore/wild/hunt.service");

class Wild extends AbstractController {
    async search (input, response) {
        const wildData = await search(this.userId);
        response(null, wildData);
    }

    async acceptBattle (input, response) {
        const startBattleData = await startBattle(this.userId);
        response(null, startBattleData);
    }

    async rejectBattle (input, response) {}

    registerEvents () {
        this.socket
            .addAjaxEvent(EVENTS.SEARCH_WILD, this.search, this)
            .addAjaxEvent(EVENTS.ACCEPT_WILD_BATTLE, this.acceptBattle, this)
            .addAjaxEvent(EVENTS.REJECT_WILD_BATTLE, this.rejectBattle, this);
    }
};

module.exports = Wild;