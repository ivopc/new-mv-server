/**
 * Which game network framework we will use? That will get in the `app-boot` folder index file of which framework
 * @todo We will build a game network framework based on SocketCluster framework
 * @enum
 */
const FW = {
    SOCKET_IO: "socket.io",
    SOCKET_CLUSTER: "socketcluster"
};

module.exports = process.env.gameNetworkFwConfig || FW.SOCKET_CLUSTER;