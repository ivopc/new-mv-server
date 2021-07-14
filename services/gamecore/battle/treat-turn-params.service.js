const { FN_NAMES } = require("../../../constants/Battle");

module.exports =  {
    [FN_NAMES.MOVE_DAMAGE]: script => ({
        monsterId: script.target.id,
        hp: script.param.hp,
        damage: script.param.damage,
        moveId: script.param.moveId,
        attackerId: script.param.attackerId,
        hited: script.param.hited,
        canDoMove: script.param.canDoMove
    })
};