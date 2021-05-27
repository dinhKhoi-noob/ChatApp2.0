const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    room:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"rooms"
    },
    user:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"users"
    },
    content:{
        type:String,
        require:true
    },
    chatName:{
        type:String
    },
    sentTime:{
        type:String,
        default: new Date().toLocaleString()
    },
    avatar:{
        type:String
    },
    staticFiles:{
        type:[Object]
    }
})

module.exports = mongoose.model('message',messageSchema);