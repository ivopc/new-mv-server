const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../constants/GameNetwork");

const { search } = require("../../services/gamecore/wild/hunt.service");

class Wild extends AbstractController {

    async search (input, response) {
        const wildData = await search(this.userId);
        response(null, wildData);
    }

    handleBattleOption (input, response) {}

    registerEvents () {
        console.log("registrou wild");
        this.socket
            .addEvent(EVENTS.SEARCH_WILD, this.search.bind(this))
            .addEvent(EVENTS.ACCEPT_REJECT_WILD_BATTLE, this.handleBattleOption.bind(this));
    }
};

module.exports = Wild;