const
    Player = require("./p2p-controller/Player"),
    Character = require("./p2p-controller/Character"),
    Chat = require("./p2p-controller/Chat"),
    Battle = require("./p2p-controller/Battle"),
    Wild = require("./p2p-controller/Wild"),
    Level = require("./p2p-controller/Level");

const { CHANNELS, P2P_EVENTS } = require("../../../../constants/GameNetwork");

const channelsEvents = [
    {
        class: Level, 
        channel: channel => CHANNELS.LEVEL(channel)
    }
];

function main(req, next) {
    const behavior = channelsEvents.find(behavior => behavior.channel(req.channel) === req.channel);
    if (!behavior) {
        next(new Error("P2P Event behavior did not found"));
        return;
    };
    const controller = new behavior.class(req, next);
    controller.fetchAndRun(req.socket.data[0]);
};

module.exports = main;