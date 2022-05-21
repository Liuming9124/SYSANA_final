const express = require('express')
const router = express.Router()

const merchantController = require('../../controllers/merchantcontroller')



router.get('/', merchantController.merchantPage)
// router.get('/', merchantController.merchantup)
// router.get('/', merchantController.merchantPage)
// router.get('/', merchantController.merchantPage)
// router.get('/', merchantController.merchantPage)


module.exports = router