const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/ordercontroller')



router.get('/', orderController.orderPage)
router.get('/showorder/:id', orderController.showorder);
router.get('/orderdetail/:id', orderController.orderdetailPage);



module.exports = router