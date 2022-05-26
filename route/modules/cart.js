const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/cartcontroller')


router.get('/', cartController.cartPage)
router.get('/add/:id', cartController.addCart)



module.exports = router