const bcrypt = require("bcryptjs");

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

module.exports = { 
    randomString, comparePasswordHash, cryptPassword, 
    booleanToInt, validateEmail, isObjectEmpty 
};