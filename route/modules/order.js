const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/ordercontroller')



router.get('/', orderController.orderPage)



module.exports = router