const { cryptPassword } = require("../../utils");
const { 
    createUser, 
    emailInUse, 
    insertCurrentDoing, 
    insertGameData, 
    insertMonsterParty 
} = require("../../models/users.db");

const checkIfEmailInUse = async email => {
    return await emailInUse(email);
};

const createNewUser = async (username, password, email, lang) => {
    const cryptedPassword = await cryptPassword(password);
    const [ newUser ] = await createUser(username, cryptedPassword, email, lang);
    const [ currentDoing, inGameData, monsterParty ] = await Promise.all([
        insertCurrentDoing(newUser.insertId),
        insertGameData(newUser.insertId),
        insertMonsterParty(newUser.insertId)
    ]);
    return newUser;
};

module.exports = { checkIfEmailInUse, createNewUser };