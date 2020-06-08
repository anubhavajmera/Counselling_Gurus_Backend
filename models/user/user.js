const mongoose = require('mongoose')
const Questions = require('./question')

const userSchema = new mongoose.Schema(
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
        },
        plan0:{
            type: Boolean,
            default: true
        },
        plan1:{
            type: Boolean,
            default: false
        },
        plan2:{
            type: Boolean,
            default: false
        },
        plan3:{
            type: Boolean,
            default: false
        },
        chat:{
            type: Questions,
            default: Questions({
                username: name,
                questionTitle: "",
                question: ""
            })
        }
    },{
        //The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
        timestamps:true
});

const User=mongoose.model('User',userSchema);
module.exports=User;