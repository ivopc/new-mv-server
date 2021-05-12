// which network framework we will use?
const FW = {
    SOCKET_IO: "socket.io",
    SOCKET_CLUSTER: "socketcluster"
};

module.exports = process.env.socketFwFolder || FW.SOCKET_CLUSTER;