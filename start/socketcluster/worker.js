const 
    SCWorker = require("socketcluster/scworker"),
    morgan = require("morgan"),
    healthChecker = require("sc-framework-health-check");

const app = require("./../../http-app");

const 
    SocketServerHandler = require("./../../websocket/socketcluster/SocketServerHandler"),
    SocketListener = require("./../../websocket/socketcluster/SocketListener");

class Worker extends SCWorker {
    run() {
        console.log("   >> Worker PID:", process.pid);
        const environment = this.options.environment;
        const httpServer = this.httpServer;
        const scServer = this.scServer;
        if (environment === "dev") {
            app.use(morgan("dev"));
        };
        healthChecker.attach(this, app);
        httpServer.on("request", app);
        SocketServerHandler.ref = new SocketServerHandler(scServer);
        scServer.on("connection", SocketListener.conn);
        // Auth websocket connection
        scServer.addMiddleware(scServer.MIDDLEWARE_HANDSHAKE_WS, SocketListener.auth);
        // Auth subscribe in channels
        scServer.addMiddleware(scServer.MIDDLEWARE_SUBSCRIBE, SocketListener.subscribe);
        // Auth publication in channels
        scServer.addMiddleware(scServer.MIDDLEWARE_PUBLISH_IN, SocketListener.publishIn);
        // Control which clients will send publications
        scServer.addMiddleware(scServer.MIDDLEWARE_PUBLISH_OUT, SocketListener.publishOut);
        // Control socket emission
        scServer.addMiddleware(scServer.MIDDLEWARE_EMIT, SocketListener.emit);
    }
}

new Worker();