const express = require('express')
const router = express.Router()

const loginController = require('../../controllers/logincontroller')



router.get('/', loginController.loginPage)



module.exports = router