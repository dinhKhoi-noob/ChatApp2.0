const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const multipleFilesSchema = new Schema({
    files:{
        type:[Object]
    }
});

module.exports = mongoose.model('multipleFiles',multipleFilesSchema);