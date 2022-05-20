const express = require('express')
const router = express.Router()

const serviceController = require('../../controllers/servicecontroller')



router.get('/', serviceController.servicePage)



module.exports = router