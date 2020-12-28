class PartySchema extends Array {
    constructor (monsters) {
        super( ... monsters);
    }

    getFirstAlive () {
        return this.find(monster => monster.current_HP > 0);
    }

    getById (id) {
        return this.find(monster => monster.id === id);
    }
};

module.exports = PartySchema;