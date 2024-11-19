// const appLog = require('../models/applog.model')
// const appProps = require('../package.json')
// const logger = require('../logger.js')

// const appName = appProps.name

// const getAppLogs = async(req, res) => {
//     const appLogId = req.params.id
//     try {
//         const appLogs = await appLog.findById(appLogId)
//         res.status(200).json(appLogs)   
//     } catch (error) {
//         logger.error(error.message)
//         res.status(500).json({message: error.message})
//     }
// }

// const createAppLog = () => { 

// }

// module.exports = {
//     getAppLogs
// }

const fs = require('fs');
const path = require('path');
const appLog = require('../models/applog.model'); // Replace with your actual Mongoose model
const logger = require('../logger.js')

const createAppLog = async (AppName) => {
    const logFilePath = path.resolve(__dirname, 'app.log');

    try {
        const data = fs.readFileSync(logFilePath, 'utf8'); // Read file synchronously
        const logs = data
            .split('\n')
            .filter(line => line.trim() !== '') // Filter out empty lines
            .map(line => {
                try {
                    const logEntry = JSON.parse(line);
                    return { ...logEntry, AppName }; // Add AppName to each log
                } catch (err) {
                    console.error(`Failed to parse log line: ${line}`);
                    return null;
                }
            })
            .filter(log => log !== null); // Filter out null logs

        if (logs.length > 0) {
            await appLog.insertMany(logs); // Insert all logs into MongoDB
            console.log(`Inserted ${logs.length} logs for App: ${AppName}`);
        } else {
            console.log('No valid logs to insert.');
        }
    } catch (error) {
        console.error(`Error reading or inserting logs: ${error.message}`);
        logger.error(error.message);
    }
};

const getAppLogs = async (req, res) => {
    const { AppName } = req.params; // Extract AppName from request parameters
    try {
        const appLogs = await appLog.find({ AppName }); // Query logs by AppName
        res.status(200).json(appLogs);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createAppLog,
    getAppLogs
}