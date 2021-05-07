const AbstractController = require("./AbstractController");

class Party extends AbstractController {

    changePosition (input) {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.CHANGE_PARTY_POSITION, input => this.changePosition(input));
    }
};

module.exports = Party;