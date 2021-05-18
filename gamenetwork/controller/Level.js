const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../constants/GameNetwork");

class Level extends AbstractController {

    change (input, response) {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.CHANGE_LEVEL, this.change);
    }
};

module.exports = Level;