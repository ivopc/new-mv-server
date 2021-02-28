const url = require("url");

const
    Player = require("./controller/Player.js"),
    Character = require("./controller/Character.js"),
    Flag = require("./controller/Flag.js"),
    Chat = require("./controller/Chat.js"),
    Monster = require("./controller/Monster.js"),
    Box = require("./controller/Box.js"),
    Battle = require("./controller/Battle.js"),
    Wild = require("./controller/Wild.js"),
    Level = require("./controller/Level.js"),
    Bag = require("./controller/Bag.js"),
    Mart = require("./controller/Mart.js"),
    Quest = require("./controller/Quest.js"),
    Tamer = require("./controller/Tamer.js"),
    Notication = require("./controller/Notication.js");

const SocketHandlerWrapper = require("./SocketHandlerWrapper");

function main(socket) {
    const socketWrapper = new SocketHandlerWrapper(socket);
    const userId = url.parse(socket.request.url, true).query.userid;
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
    ].forEach(Controller => {
        const _evt = new Controller(socketWrapper, userId);
        _evt.registerEvents();
    });
};

module.exports = main;