const AbstractP2PController = require("./AbstractP2PController");

const { P2P_EVENTS } = require("./../../../../../constants/GameNetwork");

const events = [
    { name: P2P_EVENTS.LEVEL_MOVE, method: "move" }
]

class Level extends AbstractP2PController {
    async move () {}

    fetchAndRun (eventName) {
        const execution = events.find(event => event.name === eventName);
        this[execution.method]();
    }
};

module.exports = Level;