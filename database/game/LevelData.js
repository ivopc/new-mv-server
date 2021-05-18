const levelsList = require("./level_list.json");
const LevelData = {};

levelsList.forEach(level => 
	LevelData[level.id] = require("./levels/" + level.name + ".json")
);

module.exports = LevelData;
