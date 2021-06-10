/**
 * @typedef {{userId: number, isCaptchaOpenned: boolean, lastCaptchaDate: number, captchaValue: string}} SessionData
 */

const { Session } = require("../../database/nedb");

/**
 * Insert data in `Session` storage.
 * @function
 * @param {SessionData} data
 */
const insert = data => Session.insert(data);

/** Get data from `Session` storage.
 * @function 
 * @returns {Promise<SessionData>} 
 */
const get = () => Session.findOne({});

/**
 * Generic `Session` storage updater.
 * @function
 * @return {Promise<void>}
 */
const update = data => Session.update({}, data);

module.exports = { insert, get, update };