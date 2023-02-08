const CharacterCRUD = require("./database/RethinkDBCharacterCrud");
const r = require("rethinkdb");


;(async () => {
    await CharacterCRUD.seed();
    CharacterCRUD.create({
        user_id: 1,
        nickname: "Ivopc",
        online: false,
        sprite: 2,
        level: 7,
        pos_x: 2,
        pos_y: 3,
        pos_facing: 2
    }).then(console.log).catch(console.log);
})();

