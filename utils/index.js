const bcrypt = require("bcryptjs");

const promiseWaterfall = (callbacks, initialArgs) =>
    callbacks.reduce((accumulator, callback) => 
        accumulator.then(callback), 
        Promise.resolve(initialArgs)
    );


const randomString = (len = 10) => {
    const str = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    let rand = "";
    for (let i = 0; i < len; i++)
        rand += str[Math.floor(Math.random() * str.length)];
    return rand;
};

const comparePasswordHash = async (input, inDatabase) => {
    return await bcrypt.compare(input, inDatabase);
};

const cryptPassword = async password => {
    return await bcrypt.hash(password, 10);
};

const booleanToInt = bool => {
    switch (bool) {
        case true:
        case 1:
        case "true":
        case "1":
        {
            return 1;
        };

        case false:
        case 0:
        case "false":
        case "0":
        {
            return 0;
        };
    };
};

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isObjectEmpty = obj => Object.keys(obj).length === 0;

const filterMonsterData = monsterData => { 
    const {
    id, uid, shiny, is_initial, in_pocket, monsterpedia_id, level, 
    experience, gender, hold_item, catch_item, move_0, move_1, move_2, 
    move_3, current_HP, status_problem, stats_HP, current_MP, stats_MP, 
    stats_attack, stats_defense, stats_speed, egg_is, egg_date } = monsterData;
    return {
    id, uid, shiny, is_initial, in_pocket, monsterpedia_id, level, 
    experience, gender, hold_item, catch_item, move_0, move_1, move_2, 
    move_3, current_HP, status_problem, stats_HP, current_MP, stats_MP, 
    stats_attack, stats_defense, stats_speed, egg_is, egg_date };
};

const filterMonsterList = monsterList => monsterList.map(filterMonsterData);

module.exports = { 
    promiseWaterfall, randomString, comparePasswordHash, 
    cryptPassword, booleanToInt, validateEmail, 
    isObjectEmpty, filterMonsterData, filterMonsterList
};