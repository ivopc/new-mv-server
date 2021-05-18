const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../constants/GameNetwork");

class Party extends AbstractController {

    changePosition (input) {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.CHANGE_PARTY_POSITION, this.changePosition);
    }
};

module.exports = Party;