const express=require('express');
const conatctController=require('../controllers/contact_controller');
const router=express.Router();

router.post('/message',conatctController.details);
module.exports=router;
