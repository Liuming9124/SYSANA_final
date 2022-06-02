const express = require('express')
const router = express.Router()

const memberController = require('../../controllers/membercontroller')



router.get('/', memberController.memberPage)
router.get('/logout',function (req, res){
    req.session.destroy();
    res.redirect('/home');
})
router.get('/punch', memberController.memberPunch);
router.post('/update', memberController.memberUpdate);



router.get('/myrebook', memberController.myrebookPage);
router.get('/mychbook', memberController.mychbookPage);


module.exports = router