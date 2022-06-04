const express = require('express')
const router = express.Router()

const wishlistController = require('../../controllers/wishlistcontroller')



router.get('/', wishlistController.wishlistPage)
router.post('/add',wishlistController.wishlistAdd)



module.exports = router