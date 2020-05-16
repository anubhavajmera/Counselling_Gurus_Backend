const nodeMailer=require('../config/nodemailer');


//this is another way of exporting method
exports.newComment=(data) =>{
    // console.log('inside new comment mailer',Comment);
  let htmlString=nodeMailer.renderTemplate({contact:data},'/contact_mailer.ejs');
    nodeMailer.transporter.sendMail({
        from:"luckyron1279@gmail.com",
        to:"pachory1997@gmail.com",
        subject:"User_details",
        html:htmlString
    }, (err,info) =>
    {
        if(err)
        {
            console.log('error in sending email',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    });
}
