const express = require('express')
const router = express.Router()

const classesController = require('../../controllers/classescontroller')



router.get('/:id', classesController.classesPage)



module.exports = router