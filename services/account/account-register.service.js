const { cryptPassword } = require("../../utils");
const { 
    createUser, 
    emailInUse, 
    insertCurrentDoing,
    isInputValid
} = require("../../models/users.db");
const { insertGameData } = require("../../models/gamedata.db");
const { insertMonsterParty } = require("../../models/party.db");


function isRegisterInputValid (input) {
    if (!isInputValid(input))
        throw new Error("Invalid Input!");
};

async function checkIfEmailInUse (email) {
    return await emailInUse(email);
};

async function createNewUser (username, password, email, lang) {
    const cryptedPassword = await cryptPassword(password);
    const [ newUser ] = await createUser(username, cryptedPassword, email, lang);
    const [ currentDoing, inGameData, monsterParty ] = await Promise.all([
        insertCurrentDoing(newUser.insertId),
        insertGameData(newUser.insertId),
        insertMonsterParty(newUser.insertId)
    ]);
    return newUser;
};

module.exports = { checkIfEmailInUse, createNewUser, isRegisterInputValid };