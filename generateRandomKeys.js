const randomKeyG = require('random-key')

const generateRandomKeys =()=>{
    randomKeyG.generateBase30(5);
}

module.exports = generateRandomKeys