const 
    SCWorker = require("socketcluster/scworker"),
    scCodecMinBin = require("sc-codec-min-bin");

const app = require("./../../http-app");

const 
    SocketServerHandler = require("./../../game/network/wrappers/socketcluster/SocketServerHandler"),
    SocketListener = require("./../../game/network/wrappers/socketcluster/SocketListener");

class Worker extends SCWorker {
    run() {
        console.log("   >> Worker PID:", process.pid);
        const environment = this.options.environment;
        const httpServer = this.httpServer;
        const scServer = this.scServer;
        httpServer.on("request", app);
        SocketServerHandler.ref = new SocketServerHandler(this);
        scServer.on("connection", SocketListener.conn);
        // Auth websocket connection
        scServer.addMiddleware(scServer.MIDDLEWARE_HANDSHAKE_WS, (req, next) => SocketListener.auth(req, next));
        // Auth subscribe in channels
        scServer.addMiddleware(scServer.MIDDLEWARE_SUBSCRIBE, SocketListener.subscribe);
        // Auth publication in channels
        scServer.addMiddleware(scServer.MIDDLEWARE_PUBLISH_IN, SocketListener.publishIn);
        // Control which clients will send publications
        scServer.addMiddleware(scServer.MIDDLEWARE_PUBLISH_OUT, SocketListener.publishOut);
        // Control socket emission
        if (environment !== "dev")
            scServer.setCodecEngine(scCodecMinBin);
    }
};

new Worker();