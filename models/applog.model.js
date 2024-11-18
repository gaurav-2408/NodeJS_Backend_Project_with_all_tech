const mongoose = require('mongoose')

const appLogSchema = mongoose.Schema({
    appName:{
        type: String,
        required: [true, `app name is required`] 
    },
    level:{
        type: String
    },
    message:{
        type: String
    },
    timeStamp:{
        type: String
    }
})

const AppLog = mongoose.model('AppLog', appLogSchema)

module.exports = AppLog;