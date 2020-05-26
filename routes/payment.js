const express=require('express');
const router=express.Router();
const paymentController=require('../controllers/payment_controller');
router.get('/proceed',paymentController.paymentConf);
router.get('/execute',paymentController.paymentPage);


module.exports=router;