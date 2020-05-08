//Import the mongoose module
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3060;
const path=require('path');

var mongoDB = 'mongodb://localhost/my_database';

mongoose.Promise = global.Promise;
//Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, userCreateIndex: true });

// const expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.static('assests'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', require('./routes/index'));

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, function(err)
{
    if(err)
    {
        console.log(`error in running the server: ${err}`);
    }
   console.log(`server is running on the port:${port}`);

});