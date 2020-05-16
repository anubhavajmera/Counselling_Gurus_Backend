<<<<<<< HEAD
const express=require('express');
const userController=require('../controllers/user_controller');
const router=express.Router();
router.use('/users',require('./user'));
router.use('/contact',require('./contact'));
router.use('/payment',require('./payment'));
router.get('/',userController.home);
module.exports=router;
=======
const express = require('express');
const userController = require('../controllers/user_controller');
const adminController = require('../controllers/admin_controller');
const router = express.Router();

router.use('/users', require('./user'));
router.use('/contact', require('./contact'));

router.get('/getnews', userController.getnews);
router.get('/gettrendingnews', userController.gettrendingnews);
router.get('/getuserdataapp/:email', userController.getuserdataapp);
router.get('/delete', userController.delete);
router.post('/postsignupapp', userController.postsignupapp);
router.post('/postloginapp', userController.postloginapp);
router.post('/rankpredictor', userController.rankpredictor);

router.post('/postnewsadmin', adminController.postnewsadmin);
router.post('/posttrendingnewsadmin', adminController.posttrendingnewsadmin);
router.post('/postsignupadmin', adminController.postsignupadmin);
router.post('/postloginadmin', adminController.postloginadmin);

module.exports = router;
>>>>>>> 4d3598ec0d613c236172c051cbe2ba03c1dd4170
