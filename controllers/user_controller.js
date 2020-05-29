const bcrypt = require('bcrypt');
const User = require('../models/user/user');
const jwt = require('jsonwebtoken');
const News = require('../models/user/news');
const TrendingNews = require('../models/user/trendingNews');
const Question = require('../models/user/question');

const upload = require("../middleware/imageupload");
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const csvtojson = require('csvtojson');
const csv = require('fast-csv');
var fs = require('fs');
const parse = require('csv-parse');
const IIT = require('../models/iit');
var json = require("../ranklistiit.json")

//inint nexmo
const nexmo = new Nexmo({
    apiKey: '878bd97b',
    apiSecret: '17d4e80432b74b18'
}, { debug: true });

module.exports.postsignupapp = function (req, res) {
    console.log(req.body);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: 'User already exists!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
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

module.exports.postloginapp = function (req, res) {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                        if (err) {
                            return res.status(404).json({
                                message: 'User not found!'
                            });
                        }
                        if (result) {
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

module.exports.getuserdataapp = (req, res) => {
    console.log(req.params.email);
    User.find({ email: req.params.email })
        .then(user => {
            console.log(user.toString());
            if (user.length <= 0) {
                res.status(401).json({
                    message: "User not found"
                });
            } else {
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

module.exports.delete = function (req, res) {
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
        if (err) {
            res.json({
                error: err
            });
        } else {
            res.json({
                success: "Updated",
                data: doc
            });
        }
    });
}

module.exports.collegepredictor = (req, res) => {

    var i = 0;
    var rank = req.body.rank;
    var listofcollege = [];

    res.writeHead(200, { 'Content-Type': 'application/json' });


    function gettop3colleges(rank) {
        for (i; i < 245; i++) {
            if (rank < json[i].ClosingRank) {
                listofcollege.push(json[i].College);
            } else {
                null;
            }
        }
    }

    gettop3colleges(rank);

    var myobj = {
        "name": "varun",
        "college": "BITS PILANI PILANI CAMPUS",
        "first college name": listofcollege[0],
        "second college name": listofcollege[1],
        "third college name": listofcollege[2]

    };

    res.end(JSON.stringify(myobj));


}

module.exports.postquestion = (req, res) => {
    const question = new Question({
        username: req.body.username,
        questionTitle: req.body.questionTitle,
        question: req.body.question,
        questionImage: req.file.path
    });
    question.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Question Created'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

module.exports.getquestion = (req, res) => {
    Question.find().then(ques => {
        const response = {
            ques: ques.map(q => {
                console.log(q.questionImage);
                return {
                    username: q.username,
                    questionTitle: q.questionTitle,
                    question: q.question,
                    questionImage: q.questionImage
                }
            })
        }
        res.status(200).json(response);
    });
}

module.exports.deletequestion = (req, res) => {
    Question.findOneAndRemove({ username: req.params.username })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Question Deleted!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


// module.exports.getotpmessage = (req, res) => {
//     const number = req.body.number;
//     const text = req.body.text;

//     nexmo.message.sendSms(
//         '12034848525', number, text, {type: 'unicode'},
//         (err, responseData) => {
//             if(err){
//                 console.log(err);
//             }else {
//                 console.dir(responseData);
//                 //get data from response
//                 const data = {
//                     id: responseData.messages[0]['message-id'],
//                     number: responseData.messages[0]['to']
//                 }
//                 //Emit to the client
//                 io.emit('smsStatus',data);
//             }
//         }
//     );
// }