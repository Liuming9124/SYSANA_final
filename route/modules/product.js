const express = require('express')
const router = express.Router()

const productController = require('../../controllers/productcontroller')



router.get('/', productController.productPage)



module.exports = router