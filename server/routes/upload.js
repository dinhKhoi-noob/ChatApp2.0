const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/upload');
const SingleFile = require('../models/SingleFile');
const MultipleFiles = require('../models/MultipleFiles');

router.post('/singleFile',uploadMiddleware.single('file'),async(req,res,next)=>{
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            fileType:req.file.mimetype,
            filePath: req.file.path,
            fileSize: fileSizeFormatting(req.file.size,3)
        });
        await file.save();
        console.log(file);
        res.json({success:true,status:"File uploaded",file});
    }
    catch(error)
    {
        res.status(500).json({success:false,status:"File was not uploaded"});
        console.log(error);
    }
});

router.post('/multipleFile',uploadMiddleware.array('files'),async(req,res,next)=>{
    try {
        const data = [];
        req.files.map(element=>{
            const file = new SingleFile({
                fileName:element.originalname,
                filePath:element.path,
                fileSize:fileSizeFormatting(element.size),
                fileType:element.mimetype
            });
            data.push(file);
        })
        const newFiles = new MultipleFiles({
            files:data
        });
        await newFiles.save();
        res.json({success:true,status:"Files uploaded",file:newFiles});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,status:"Files were not uploaded"});
    }
})

const fileSizeFormatting = (bytes,decimals) => {
    if(bytes === 0)
        return '0-Bytes'
    const dm = decimals || 2;
    const sizes = ['Byte','KB','MB','GB','TB','PB','EB','YB','ZB'];
    const index = Math.floor(Math.log(bytes)/Math.log(1000));
    return parseFloat(bytes/Math.pow(1000,index).toFixed(dm))+'-'+sizes[index];
}

module.exports = router;