const express = require('express')
const router = express.Router()

const loginController = require('../../controllers/logincontroller')



router.get('/', loginController.loginPage)
router.get('/login', loginController.loginPage)



module.exports = router