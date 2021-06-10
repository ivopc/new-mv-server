const fwFolderConfig = require("./../frameworkConfig");

const
    Player = require("./controller/Player"),
    Character = require("./controller/Character"),
    Flag = require("./controller/Flag"),
    Chat = require("./controller/Chat"),
    Monster = require("./controller/Monster"),
    Party = require("./controller/Party"),
    Box = require("./controller/Box"),
    Battle = require("./controller/Battle"),
    Wild = require("./controller/Wild"),
    Level = require("./controller/Level"),
    Bag = require("./controller/Bag"),
    Mart = require("./controller/Mart"),
    MarketPlace = require("./controller/MarketPlace"),
    Quest = require("./controller/Quest"),
    Tamer = require("./controller/Tamer"),
    Notication = require("./controller/Notication");

const SocketHandlerWrapper = require(`./${fwFolderConfig}/SocketHandlerWrapper`);

function main(socket) {
    const 
        socketWrapper = new SocketHandlerWrapper(socket),
        userId = socketWrapper.getAuth()["userId"];
    [
        Player, // v
        Character, // v
        Flag,
        Chat,
        Monster, // x
        Party,// v
        Box,
        Battle,
        Wild, // v
        Level, // v
        Bag, // v
        Mart,
        MarketPlace,
        Quest, // v
        Tamer, // x
        Notication
    ].forEach(SocketController => {
        const controller = new SocketController(socketWrapper, userId);
        controller.registerEvents();
    });
};

module.exports = main;