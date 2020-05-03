const express=require('express');
const userController=require('../controllers/user_controller');
const router=express.Router();
router.get('/',userController.home);
router.post('/create',userController.create);
router.get('/signup',userController.signup);
module.exports=router;