const mongoose=require('mongoose')




const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true
        }
    },{
        //The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes.
        timestamps:true
    });

const User=mongoose.model('User',userSchema);
module.exports=User;