const AbstractController = require("./AbstractController");

class Level extends AbstractController {

    change (input, response) {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.CHANGE_LEVEL, (input, response) => this.change(input, response));
    }
};

module.exports = Level;