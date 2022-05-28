const express = require('express')
const router = express.Router()

const chbookController = require('../../controllers/chbookcontroller')



router.get('/', chbookController.chbookPage)
router.post('/add',chbookController.chbookAdd)



module.exports = router