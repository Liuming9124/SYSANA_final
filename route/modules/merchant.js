const express = require('express')
const router = express.Router()

const merchantController = require('../../controllers/merchantcontroller')



router.get('/', merchantController.merchantPage)
router.get('/chbook', merchantController.chbookPage)
router.get('/rebook', merchantController.rebookPage)
router.get('/order', merchantController.orderPage)
router.get('/upload', merchantController.uploadPage)

//order
router.get('/order/confirm/:id', merchantController.confirmOrder);
router.get('/order/cancel/:id' , merchantController.cancelOrder);

//rebook
router.get('/rebook/confirm/:id', merchantController.confirmRebook);
router.get('/rebook/cancel/:id',  merchantController.cancelRebook);

module.exports = router