const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../constants/GameNetwork");

class Bag extends AbstractController {

    useItem (input, response) {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.USE_ITEM, this.useItem);
    }
};

module.exports = Bag;