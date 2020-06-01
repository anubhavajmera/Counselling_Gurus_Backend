const express = require('express');
const userController = require('../controllers/user_controller');
const adminController = require('../controllers/admin_controller');
const router = express.Router();
const path = require('path');
const multer = require('multer');
// const Nexmo = require('nexmo');
// const socketio = require('socket.io');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname + '/uploads/'));
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('It is not an image file'), false);
    }
}

const upload = multer({ storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.use('/users', require('./user'));
router.use('/contact', require('./contact'));

router.get('/getnews', userController.getnews);
router.get('/gettrendingnews', userController.gettrendingnews);
router.get('/getuserdataapp/:email', userController.getuserdataapp);
router.get('/delete', userController.delete);
router.post('/postsignupapp', userController.postsignupapp);
router.post('/postloginapp', userController.postloginapp);
router.get('/rankpredictor', userController.rankpredictor);
router.get('/collegepredictor/:rank', userController.collegepredictor);
router.post('/postquestion', upload.single('questionImage'), userController.postquestion);
router.get('/getquestion', userController.getquestion);
router.get('/deletequestion/:username', userController.deletequestion);
//router.post('/getotpmessage', userController.getotpmessage);

router.post('/postnewsadmin', adminController.postnewsadmin);
router.post('/posttrendingnewsadmin', adminController.posttrendingnewsadmin);
router.post('/postsignupadmin', adminController.postsignupadmin);
router.post('/postloginadmin', adminController.postloginadmin);


module.exports = router;
