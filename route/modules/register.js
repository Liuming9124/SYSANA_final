// const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

const registerController = require('../../controllers/registercontroller')



router.get('/', registerController.registerPage)
router.post('/add',registerController.registerAdd)



module.exports = router