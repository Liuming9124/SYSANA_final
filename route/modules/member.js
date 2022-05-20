const express = require('express')
const router = express.Router()

const memberController = require('../../controllers/membercontroller')



router.get('/', memberController.memberPage)



module.exports = router