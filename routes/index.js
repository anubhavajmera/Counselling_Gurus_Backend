const express=require('express');
const userController=require('../controllers/user_controller');
const router=express.Router();
router.use('/users',require('./user'));
router.get('/',userController.home);
module.exports=router;