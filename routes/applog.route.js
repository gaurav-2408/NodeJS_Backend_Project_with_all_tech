const express = require('express')
const router = express.Router()
const {getAppLogs, createAppLog} = require('../controllers/applog.controller')

router.get('/', getAppLogs)
router.get('/:Appname', createAppLog)

module.exports = router