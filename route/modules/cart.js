const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/cartcontroller')


router.get('/:id', cartController.cartPage)



module.exports = router