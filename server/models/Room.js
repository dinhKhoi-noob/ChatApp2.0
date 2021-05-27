const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'users'
    },
    roomId:{
        type:String,
        require:true
    },
    roomName : {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('rooms',RoomSchema);