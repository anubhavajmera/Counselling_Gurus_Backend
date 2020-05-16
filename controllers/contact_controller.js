const Conatct=require('../models/contact');
const contact_mailer=require('../mailer/contact_mailer');
module.exports.details=function(req,res)
{
    console.log(req.body);
    contact_mailer.newComment(req.body);
    return res.redirect('back');
}