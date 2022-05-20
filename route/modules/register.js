const express = require('express')
const router = express.Router()

const registerController = require('../../controllers/registercontroller')



router.get('/', registerController.registerPage)



module.exports = router