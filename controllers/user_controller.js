const User=require('../models/user');

module.exports.home=function(req,res)
{
    return res.render('home');
}
module.exports.signup=function(req,res)
{
    return res.render('signup');
}
module.exports.create=function(req,res)
{
    console.log(req.body);
   if(req.body.password!=req.body.confirm_password)
   {
    //    req.flash('error','Password do not match');
      console.log('error','password not match');
       return res.redirect('back');
   }
//    User.findOne({email: req.body.email},function(err,user)
//    {
//       if(err){console.log('error in finding user in signing up'); return}
//       if(!user)
//       {
//           User.create(req.body,function(err,user)
//           {
//               if(err){req.flash('error',err); return}
//               return res.redirect('/users/signin');
//           });
//         console.log('user created successfully');
//       }
//       else{
//           return res.redirect('back');
//       }
//    });
}