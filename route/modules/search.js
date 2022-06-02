const express = require('express')
const router = express.Router()

const searchController = require('../../controllers/searchcontroller.js')



router.post('/', searchController.searchPage)



module.exports = router
