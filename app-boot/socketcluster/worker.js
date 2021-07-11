const 
    SCWorker = require("socketcluster/scworker"),
    scCodecMinBin = require("sc-codec-min-bin");

const httpService = require("./../../http");

const NetworkListener = require("../../game/network/wrappers/socketcluster/NetworkListener");

const
    NetworkServerConnectedPlayersManager = require("./../../game/network/wrappers/socketcluster/NetworkServerConnectedPlayersManager"),
    NetworkServerChannelsManager = require("./../../game/network/wrappers/socketcluster/NetworkServerChannelsManager");

class Worker extends SCWorker {
    run () {
        console.log("   >> Worker PID:", process.pid);
        const { httpServer, scServer } = this;
        this.setupManagers();
        this.setupCoded();
        this.setupMiddlewares();
        httpServer.on("request", httpService);
        scServer.on("connection", NetworkListener.conn);

    }

    setupManagers () {
        [
            NetworkServerConnectedPlayersManager,
            NetworkServerChannelsManager
        ].forEach(manager => manager.setServer(this));
    }

    setupMiddlewares () {
        const { scServer } = this;
        scServer.addMiddleware(scServer.MIDDLEWARE_HANDSHAKE_WS, (req, next) => NetworkListener.auth(req, next));
        scServer.addMiddleware(scServer.MIDDLEWARE_SUBSCRIBE, NetworkListener.subscribe);
        scServer.addMiddleware(scServer.MIDDLEWARE_PUBLISH_IN, NetworkListener.publishIn);
        // Control which clients will send publications
        scServer.addMiddleware(scServer.MIDDLEWARE_PUBLISH_OUT, NetworkListener.publishOut);
    }

    setupCoded () {
        if (this.options.environment !== "dev")
        this.scServer.setCodecEngine(scCodecMinBin);
    }
};

// Start worker
new Worker();