const express = require('express')
const router = express.Router()

const collectController = require('../../controllers/collectcontroller')



router.get('/', collectController.collectPage)
router.get('/add/:id', collectController.addCollect);



module.exports = router