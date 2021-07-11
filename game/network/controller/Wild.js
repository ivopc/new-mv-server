const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../../constants/GameNetwork");

const { search } = require("../../../services/gamecore/wild/hunt.service");

class Wild extends AbstractController {

    async search (input, response) {
        const wildData = await search(this.userId);
        response(null, wildData);
    }

    handleBattleOption (input, response) {}

    registerEvents () {
        this.socket
            .addAjaxEvent(EVENTS.SEARCH_WILD, this.search, this)
            .addAjaxEvent(EVENTS.ACCEPT_REJECT_WILD_BATTLE, this.handleBattleOption, this);
    }
};

module.exports = Wild;