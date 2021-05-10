const CHANNELS = {
    GLOBAL: () => "g",
    USERS: id => `u${id}`,
    LEVEL: id => `l${id}`
};

module.exports = { CHANNELS };