const express = require('express')
const router = express.Router()

const checkoutController = require('../../controllers/checkoutcontroller.js')


router.get('/', checkoutController.checkoutPage)
router.post('/add', checkoutController.addcheckout)



module.exports = router