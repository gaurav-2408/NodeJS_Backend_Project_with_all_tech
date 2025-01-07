const randomKeyG = require('random-key')

const generateRandomKeys =()=>{
    return randomKeyG.generateBase30(5);
}

module.exports = generateRandomKeys