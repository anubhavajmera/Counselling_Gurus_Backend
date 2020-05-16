const express=require('express');
const app=express();
const port=8000;
const path=require('path');
// const expressLayouts=require('express-ejs-layouts');
// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('assests'));
app.use('/',require('./routes'));
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in running the server: ${err}`);
    }
   console.log(`server is running on the port:${port}`);
});