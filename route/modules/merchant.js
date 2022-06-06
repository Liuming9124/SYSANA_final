const express = require('express')
const router = express.Router()

const merchantController = require('../../controllers/merchantcontroller')



router.get('/', merchantController.merchantPage)
router.get('/chbook', merchantController.chbookPage)
router.get('/rebook', merchantController.rebookPage)
router.get('/order', merchantController.orderPage)
router.get('/upload', merchantController.uploadPage)
router.get('/wish', merchantController.wishPage)

//order
router.get('/order/confirm/:id', merchantController.confirmOrder);
router.get('/order/cancel/:id' , merchantController.cancelOrder);
router.get('/showorder/:id', merchantController.showorder);

//rebook
router.get('/rebook/confirm/:id', merchantController.confirmRebook);
router.get('/rebook/cancel/:id',  merchantController.cancelRebook);
router.get('/showrebook/:id',     merchantController.showRebook);

//chbook
router.get('/chbook/confirm/:id', merchantController.confirmChbook);
router.get('/chbook/cancel/:id',  merchantController.cancelChbook);
router.get('/showchbook/:id',     merchantController.showChbook);

//upload
router.post('/uploadbook', merchantController.uploadItem);

//wish
router.get('/wish/confirm/:id', merchantController.confirmwish);
router.get('/wish/cancel/:id',  merchantController.cancelwish);
module.exports = router