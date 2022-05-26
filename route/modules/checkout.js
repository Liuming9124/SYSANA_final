const express = require('express')
const router = express.Router()

const checkoutController = require('../../controllers/checkoutcontroller.js')


router.get('/', checkoutController.checkoutPage)



module.exports = router