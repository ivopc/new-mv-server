const
    Player = require("./p2p-controller/Player"),
    Character = require("./p2p-controller/Character"),
    Chat = require("./p2p-controller/Chat"),
    Battle = require("./p2p-controller/Battle"),
    Wild = require("./p2p-controller/Wild"),
    Level = require("./p2p-controller/Level");

function main(req, next) {
    P2PListener.checkEvent(req.channel);
    [
        Battle,
        Character,
        Chat,
        Level,
        Player
    ].forEach(P2PSocketController => {
        const p2pController = new P2PSocketController(p2pSocketWrapper, userId);
        p2pController.checkEvent(req.channel);
    });
};

module.exports = main;