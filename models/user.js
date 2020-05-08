const mongoose = require('mongoose')

<<<<<<< HEAD
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
=======


const userSchema=new mongoose.Schema(
{
>>>>>>> 92553138f21bf3083e9d14ed7d5f717d2f43a42e
        email:{
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
        },
        contact:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true,
        }
    },{
        //The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
        timestamps:true
});

const User=mongoose.model('User',userSchema);
module.exports=User;