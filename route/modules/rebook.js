const express = require('express')
const router = express.Router()

const rebookController = require('../../controllers/rebookcontroller')



router.get('/', rebookController.rebookPage);
router.post('/add', rebookController.rebookAdd);



module.exports = router