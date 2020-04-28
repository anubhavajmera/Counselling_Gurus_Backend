const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/models/user');

//Connect to mongoDB
mongoose.connect('mongodb+srv://Anubhav1312:'+ process.env.MONGO_ATLAS_PW +'@counselling-gurus-ppsrl.mongodb.net/test?retryWrites=true&w=majority', {
   //useMongoClient: true -- old
   useNewUrlParser: true,
   useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

//Using middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes that handle request
app.use('/products', productRoutes); // Filter routes only with /products
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;