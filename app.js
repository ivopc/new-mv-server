// Get which game network framework we will use and boot the app
const gameNetworkFwFolderConfig = require("./game-network-framework-config");

require(`./app-boot/${gameNetworkFwFolderConfig}/`);