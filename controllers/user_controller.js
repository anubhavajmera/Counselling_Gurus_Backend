const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.home = function(req,res)
{
    return res.render('home');
}

module.exports.create = function(req,res)
{
    return res.render('creste');
}

module.exports.signup = function(req,res)
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

module.exports.login = function(req, res)
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