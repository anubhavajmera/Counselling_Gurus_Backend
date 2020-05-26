<<<<<<< HEAD
const Conatct=require('../models/contact');
const contact_mailer=require('../mailer/contact_mailer');
module.exports.details=function(req,res)
=======
const Conatct = require('../models/contact');

module.exports.details = function(req,res)
>>>>>>> 4d3598ec0d613c236172c051cbe2ba03c1dd4170
{
    console.log(req.body);
    contact_mailer.newComment(req.body);
    return res.redirect('back');
}