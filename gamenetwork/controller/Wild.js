const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../constants/GameNetwork");

class Wild extends AbstractController {

    search (input, response) {}

    handleIfBattle (input, response) {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.SEARCH_WILD, (input, response) => this.search(input, response))
            .addEvent(EVENTS.ACCEPT_REJECT_WILD_BATTLE, (input, response) => this.handleIfBattle(input, response));
    }
};

module.exports = Wild;