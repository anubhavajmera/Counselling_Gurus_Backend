const bcrypt = require('bcrypt');
const User = require('../models/user/user');
const jwt = require('jsonwebtoken');
const News = require('../models/user/news');
const TrendingNews = require('../models/user/trendingNews');

const csv = require('fast-csv');
var fs = require('fs');
const parse = require('csv-parse');
const IIT = require('../models/iit');

module.exports.postsignupapp = function(req,res)
{
    console.log(req.body);
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length > 0){
            return res.status(409).json({
                message: 'User already exists!'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }else {
                    const user = new User({
                        name: req.body.name,
                        contact: req.body.contact,
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
}

module.exports.postloginapp = function(req, res)
{
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(404).json({
                message: 'User not found!'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err){
                        return res.status(404).json({
                            message: 'User not found!'
                        });
                    }
                    if(result){
                        const token = jwt.sign({
                            email: user[0].email
                        }, 
                        "secret", 
                        {
                            expiresIn: "1h"
                        });

                        return res.status(200).json({
                            message: 'Login Successful',
                            token: token
                        });
                    }
                    return res.status(404).json({
                        message: 'Login failed'
                    });
                });
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports.getuserdataapp = (req, res) =>
{
    console.log(req.params.email);
    User.find({ email: req.params.email })
    .then(user => {
        console.log(user.toString());
        if(user.length <= 0){
            res.status(401).json({
                message: "User not found"
            });
        }else{
            return res.json({
                email: user[0].email,
                name: user[0].name,
                contact: user[0].contact
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports.delete = function(req,res)
{
    User.remove({ email: req.body.email })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User Deleted!"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports.getnews = (req, res) => {
    News.find()
    .then(news => {
        res.status(200).json({
            count: news.length,
            item: news.map(doc => {
                return {
                    heading: doc.heading,
                    subheading: doc.subheading
                };
            }),
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports.gettrendingnews = (req, res) => {
    TrendingNews.find()
    .then(trendingnews => {
        res.status(200).json({
            count: trendingnews.length,
            item: trendingnews.map(doc => {
                return {
                    heading: doc.heading,
                    subheading: doc.subheading
                };
            }),
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

// var stream = fs.createReadStream("iit.csv").pipe(parse({ from_line: 2 }));
// router.get('/go', (req, res) => {
//     var myData = [];
//     var csvStream = csv.parse().on('data', (data) => {
//         myData.push({
//             branch: data[0],
//             opening: data[1],
//             closing: data[2]
//         });
//     });
//         IIT.insertMany(myData).then(doc => {
//             res.json({
//                 data: doc
//             });
//         });
//         stream.pipe(csvStream);
//         res.json({
//             success: "Data imported",
//         });
// });

module.exports.rankpredictor = (req, res) => {
    IIT.find({ opening: { $gt: 400, $type: "string" } }, (err, doc) => {
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
}




