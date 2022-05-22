const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/cartcontroller')


router.get('/', cartController.cartPage)



module.exports = router