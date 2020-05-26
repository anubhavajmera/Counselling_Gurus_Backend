
const razorpay=require('razorpay');
var instance = new razorpay({
    key_id:'rzp_test_oNAPi75r3Iixih',
    key_secret:'nKOtoPKVfifvW98lCA1rjW69'
  })
//   const id=instance.orders.create({amount:500*100,currency:"INR"});
//   console.log(id);
 module.exports.paymentPage=function(req,res)
 {
     return res.render('payment');
 }
module.exports.paymentConf= function(req,res)
{
    console.log(req.query.amount);
    var options = {
        amount: req.query.amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
        // payment_capture: '0'
      };
       instance.orders.create(options, function(err, order) {
          if(err)
          {
              console.log(err);
          }
         else
         {
            
            return res.json(200,{
                message:'Successful',
                data:{
                    order:order
                }
            }); 
         }
         return res.redirect('back');
      });
}