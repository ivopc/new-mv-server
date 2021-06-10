const nedb = require("nedb-promises");

/**
 * @typedef {{userId: number, isCaptchaOpenned: boolean, lastCaptchaDate: number, captchaValue: string}} SessionData
 * @typedef {{x: number, y: number, character: number}} PlayerCharacterData
 */

const Session = nedb.create();
const PlayerCharacter = nedb.create();

;(async () => {
    /**
     * @type {SessionData}
     */
    const sessionData = {
        userId: 1,
        isCaptchaOpenned: true,
        lastCaptchaDate: Date.now(), 
        captchaValue: "ab4mjk65ja"
    };
    await Session.insert(sessionData);
    /**
     * @type {SessionData}
     */
    const userSession = await Session.findOne({});
    console.log("user session", userSession);
})();

module.exports = { Session, PlayerCharacter };