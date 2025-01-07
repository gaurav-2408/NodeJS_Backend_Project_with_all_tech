const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Define log file path
const logFilePath = path.join(__dirname, 'app.log');

// Function to truncate log file if it exceeds 10 linessssssssssssssssss
function truncateLogsIfNeeded() {
    if (fs.existsSync(logFilePath)) {
        const logs = fs.readFileSync(logFilePath, 'utf8').split('\n');
        if (logs.length > 10) {
            // Keep only the last 10 lines
            const truncatedLogs = logs.slice(-10).join('\n');
            fs.writeFileSync(logFilePath, truncatedLogs, 'utf8');
        }
    }
}

const logger = new (winston.Logger)({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ 
            filename: logFilePath, 
            json: false, // Disable JSON format to write plain text logs
        }),
    ]
});

logger.on('logging', truncateLogsIfNeeded);

module.exports = logger;
