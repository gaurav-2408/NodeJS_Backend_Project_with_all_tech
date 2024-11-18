const express = require('express')
const router = express.Router()
const {getAppLogs} = require('../controllers/applog.controller')

router.get('/', getAppLogs)

module.exports = router