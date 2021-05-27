const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
    },
    chatName:{
        type:String,
        unique:true,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String,
        default:"http://localhost:5000/uploads/2021-05-16T02-11-02.795Z-1024px-User-avatar.svg.png"
    }
})

module.exports = mongoose.model('users',UserSchema)