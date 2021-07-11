const fwFolderConfig = require("../../game-network-framework-config");

const NetworkHandlerWrapper = require(`./wrappers/${fwFolderConfig}/NetworkHandlerWrapper`);

module.exports = function (network) {
    const networkWrapper = new NetworkHandlerWrapper(network);
    [
        "Player",
        "Character", 
        "Flag",
        "Chat",
        "Monster", 
        "Party",
        "Box",
        "Battle",
        "Wild",
        "Level",
        "Bag", 
        "Mart",
        "MarketPlace",
        "Quest",
        "Tamer", 
        "Notication"
    ].forEach(module => {
        const NetworkController = require(`./controller/${module}`);
        const controller = new NetworkController(
            networkWrapper, 
            networkWrapper.getAuth()["userId"]
        ); // {legacy}
        //controller.setUserId(networkWrapper.getAuth()["userId"]); {todo}
        //controller.setSession(networkWrapper.getSession()); {todo}
        controller.registerEvents();
    });
};