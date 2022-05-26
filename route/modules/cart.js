const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/cartcontroller')


router.get('/', cartController.cartPage)
router.get('/add/:id', cartController.addCart)
router.get('/buy/:id', cartController.buyCart)
router.get('/del/:id', cartController.delCart)



module.exports = router