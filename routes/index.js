const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();
const csv = require('fast-csv');
var fs = require('fs');
const parse = require('csv-parse');
const IIT = require('../models/iit');

var stream = fs.createReadStream("iit.csv").pipe(parse({ from_line: 2 }));
router.get('/go', (req, res) => {
    var myData = [];
    var csvStream = csv.parse().on('data', (data) => {
        myData.push({
            branch: data[0],
            opening: data[1],
            closing: data[2]
        });
    });
        IIT.insertMany(myData).then(doc => {
            res.json({
                data: doc
            });
        });
        stream.pipe(csvStream);
        res.json({
            success: "Data imported",
        });
});

router.get('/fetch', (req, res) => {
  IIT.find({}, (err, doc) => {
    if(err){
        res.json({
            error: err
        });
    }else{
        res.json({
            success: "Updated",
            data: doc
        });
    }
  });
});

router.use('/users',require('./user'));
router.use('/contact',require('./contact'));
router.get('/',userController.home);

router.get('/getuserdataapp/:email', userController.getuserdataapp);

router.post('/create', userController.create);

router.post('/postsignupapp', userController.postsignupapp);

router.post('/postloginapp', userController.postloginapp);

router.get('/delete', userController.delete);

module.exports = router;
