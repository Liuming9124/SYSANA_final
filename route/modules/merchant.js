const express = require('express')
const router = express.Router()

const merchantController = require('../../controllers/merchantcontroller')



router.get('/', merchantController.merchantPage)
router.get('/chbook', merchantController.chbookPage)
router.get('/rebook', merchantController.rebookPage)
router.get('/order', merchantController.orderPage)
router.get('/upload', merchantController.uploadPage)

module.exports = router