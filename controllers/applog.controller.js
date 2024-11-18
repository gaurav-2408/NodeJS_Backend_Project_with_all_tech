const appLog = require('../models/applog.model')
const appProps = require('../package.json')
const logger = require('../logger.js')

const appName = appProps.name

const getAppLogs = async(req, res) => {
    const appLogId = req.params.id
    try {
        const appLogs = await appLog.findById(appLogId)
        res.status(200).json(appLogs)   
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAppLogs
}