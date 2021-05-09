const WRAPPER = {
    SOCKET_IO: "sio-wrapper",
    SOCKET_CLUSTER: "sc-wrapper"
};

const currentWrapperFolder = process.env.socketFwFolder || WRAPPER.SOCKET_CLUSTER;

module.exports = currentWrapperFolder;