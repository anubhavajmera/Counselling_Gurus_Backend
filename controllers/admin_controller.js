const News = require('../models/user/news');
const TrendingNews = require('../models/user/trendingNews');
const Admin = require('../models/admin/admin');

module.exports.postsignupadmin = function(req,res)
{
    console.log(req.body);
    Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
        if(admin.length > 0){
            return res.status(409).json({
                message: 'Admin already exists!'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }else {
                    const admin = new Admin({
                        name: req.body.name,
                        contact: req.body.contact,
                        email: req.body.email,
                        password: hash
                    });
                    admin.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Admin Created'
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

module.exports.postloginadmin = function(req, res)
{
    Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
        if(admin.length < 1){
            return res.status(404).json({
                message: 'Admin not found!'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                    if(err){
                        return res.status(404).json({
                            message: 'Admin not found!'
                        });
                    }
                    if(result){
                        const token = jwt.sign({
                            email: admin[0].email
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

module.exports.postnewsadmin = (req, res) => {
    News.find({ heading: req.body.heading })
    .exec()
    .then(news => {
        if(news.length > 0){
            return res.status(409).json({
                message: 'News already exists!'
            });
        }else{  
            const newsadmin = new News({
                heading: req.body.heading,
                subheading: req.body.subheading
            });
            newsadmin.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'News Created'
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

module.exports.posttrendingnewsadmin = (req, res) => {
    TrendingNews.find({ heading: req.body.heading })
    .exec()
    .then(news => {
        if(news.length > 0){
            return res.status(409).json({
                message: 'News already exists!'
            });
        }else{  
            const newstrendingadmin = new TrendingNews({
                heading: req.body.heading,
                subheading: req.body.subheading
            });
            newstrendingadmin.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'News Created'
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