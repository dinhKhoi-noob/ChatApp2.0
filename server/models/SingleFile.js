const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    fileName:{
        type:String,
        require:true
    },
    fileType:{
        type:String,
        require:true
    },
    filePath:{
        type:String,
        require:true
    },
    fileSize:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('singleFile', singleFileSchema);