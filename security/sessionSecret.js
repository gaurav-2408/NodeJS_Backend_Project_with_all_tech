const randomKeyG = require('random-key')

const sessionSecret =()=>{
    return randomKeyG.generateBase30(5);
}

module.exports = sessionSecret