const url = require("url");

const
    Player = require("./controller/Player"),
    Character = require("./controller/Character"),
    Flag = require("./controller/Flag"),
    Chat = require("./controller/Chat"),
    Monster = require("./controller/Monster"),
    Box = require("./controller/Box"),
    Battle = require("./controller/Battle"),
    Wild = require("./controller/Wild"),
    Level = require("./controller/Level"),
    Bag = require("./controller/Bag"),
    Mart = require("./controller/Mart"),
    Quest = require("./controller/Quest"),
    Tamer = require("./controller/Tamer"),
    Notication = require("./controller/Notication");

const SocketHandlerWrapper = require("./SocketHandlerWrapper");

function main(socket) {
    const 
        socketWrapper = new SocketHandlerWrapper(socket),
        userId = url.parse(socket.request.url, true).query["userid"];
    [
        Player,
        CharacterMove,
        Flag,
        Chat,
        Monster,
        Box,
        Battle,
        Wild,
        Level,
        Bag,
        Mart,
        Quest,
        Tamer,
        Notication
    ].forEach(SocketController => {
        const controller = new SocketController(socketWrapper, userId);
        controller.registerEvents();
    });
};

module.exports = main;