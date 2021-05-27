const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g,'-')+'-'+file.originalname)
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype)
        cb(null,true);
    else
        cb(null,false);
}

const upload = multer({storage,fileFilter});

module.exports = upload