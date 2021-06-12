const AbstractController = require("./AbstractController");

const { EVENTS } = require("../../../constants/GameNetwork");

class Quest extends AbstractController {

    start (input, response) {}

    get (input, response) {}

    getList (input, response) {}

    requestAction (input, response) {}

    registerEvents () {
        this.socket
            .addEvent(EVENTS.START_QUEST, (input, response) => this.start(input, response))
            .addEvent(EVENTS.GET_QUEST, (input, response) => this.get(input, response))
            .addEvent(EVENTS.GET_QUEST_LIST, (input, response) => this.getList(input, response))
            .addEvent(EVENTS.EXEC_ACTION, (input, response) => this.requestAction(input, response))
    }
};

module.exports = Quest;