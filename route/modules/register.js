// const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

const registerController = require('../../controllers/registercontroller')

// var jsonParser       = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// var multer = require('multer')
// var upload = multer()



router.get('/', registerController.registerPage)
router.post('/add',registerController.registerAdd)



module.exports = router