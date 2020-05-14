const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
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

const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;