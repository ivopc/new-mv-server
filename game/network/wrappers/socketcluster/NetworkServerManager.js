const { CHANNELS } = require("./../../../../constants/GameNetwork");

class NetworkServerManager {
    constructor (server) {
        this.server = server;
    }

    publishToEveryOne (data) {
        this.server.exchange.publish(CHANNELS.GLOBAL(), data);
    }

    publishToPlayer (userId, data) {
        this.server.exchange.publish(CHANNELS.PLAYER(userId), data);
    }

    publishToLevel (levelId, data) {
        this.server.exchange.publish(CHANNELS.LEVEL(levelId), data);
    }

    publishToPvPBattle (battleId, data) {
        this.server.exchange.publish(CHANNELS.PVP_BATTLE(battleId), data);
    }

    setPvPBattleData (battleId, data) {
        return new Promise((resolve, reject) => 
            this.server.exchange.set(CHANNELS.PVP_BATTLE(battleId), data, err => err ? reject(err) : resolve())
        );
    }

    getPvPBattleData (battleId) {
        return new Promise((resolve, reject) => 
            this.server.exchange.get(CHANNELS.PVP_BATTLE(battleId), (err, data) => err ? reject(err) : resolve(data))
        );
    }

    disconnectPlayer (id) {
        this.server.clients[id].disconnect();
    }

    /** Static reference to self class `NetworkServerManager` singleton.
     * @static
     * @returns {NetworkServerManager}
     */
    static ref
};

module.exports = NetworkServerManager;