const
    Player = require("./Player"),
    Character = require("./Character"),
    Chat = require("./Chat"),
    Battle = require("./Battle"),
    Wild = require("./Wild"),
    Level = require("./Level");

class P2PListener {
    static checkEvent (channel) {
        const channelName = channel.charAt(0);
        switch(channelName) {
            case CHANNELS.CHARACTER: {break;};
            case CHANNELS.PLAYER: {break;};
            case CHANNELS.CHAT: {break};
            case CHANNELS.PVP: {break;};
            case CHANNELS.WILD: {break;};
            case CHANNELS.LEVEL: {break;};
        };
    }
};

module.exports = P2PListener;
