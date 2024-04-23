const mongoose=require('mongoose');

var Schema=mongoose.Schema({

    email:{
        type:String,
        unique:[true,"already exists"],
        required:[true,'email is required'],
        
    },
    password:{
        type:String,
        minlength:[7,"min Length should be 7"],
        required:[true,"password is required"]
    },
    name:{
        type:String,
        required:[true,"name is required"]
    },
    username:{
        type:String,
        unique:[true,"name already exists"],
        required:[true,"username is required"]
    },
    image:{
        type:String
    }
})
const model=mongoose.model('User',Schema);
module.exports =model; 