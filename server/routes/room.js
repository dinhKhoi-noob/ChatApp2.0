const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const Message = require('../models/Message')
const Room = require("../models/Room");
const random = require('random');
const verifyToken = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.get('/',verifyToken,async(req,res)=>{
    try 
    {
        const ownerRooms = await Room.find({owner:req.userId}).populate('user',['username','createAt']);
        const otherRooms = await Room.find({owner:{$ne:req.userId}}).populate('user',['username','createAt']);
        res.json({success:true,message:"Successfully!",ownerRooms,otherRooms});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message:"Internal server failed",success:false});
    }
});

router.get('/:id',verifyToken,async(req,res)=>{
    try 
    {
        const room = await Room.find({_id:req.params.id}).select();
        console.log(room);
        if(!room)
            res.status(404).json({message:"Room not found",success:false});
        res.json({success:true,message:"Successfully",room});
    } 
    catch (error) 
    {
        res.status(500).json({message:"Internal server failed"});
    }
})

router.post('/verify/:id',verifyToken,async(req,res)=>{
    const {password} = req.body;
    if(!password)
        res.json({success:false,message:"Password is required"})
    try 
    {
        const room = await Room.findOne({_id:req.params.id});
        if(!room)
            res.status(404).json({message:"Room not found",success:false});
        const isValidPassword = await argon2.verify(room.password,password);
        if(!isValidPassword)
            res.status(400).json({message:"Invalid password",success:false});
        else
            res.json({success:true,message:"Let's chat"});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message:"Internal server failed"});
    }
})

router.post('/create',verifyToken,async(req,res)=>{
    const {roomName,password} = req.body;
    if(!roomName || !password)
        res.status(400).json({message:"Please enter all fields",success:false});
    try
    {
        const hashPassword = await argon2.hash(password);
        const newRoom = new Room({
            owner:req.userId,
            roomId:random.int(0,999999).toString(),
            roomName,
            password:hashPassword
        })
        await newRoom.save();
        res.json({message:"Created",success:true,newRoom});
    } 
    catch (error)
    {
        res.status(500).json({message:"Internal server failed"});
        console.log(error);
    }
})

router.get('/messages/:id',verifyToken,async(req,res)=>{
    try 
    {
        let messages = await Message.find({room:req.params.id});
        res.json({success:true,message:"Successfully",messages})
    } 
    catch (error) 
    {
        res.status(500).json({message:"Internal server failed",success:false})
    }
})

router.delete('/messages/:id',async(req,res)=>{
    try {
        const deleteMessage = await Message.deleteMany({room:req.params.id});
        if(!deleteMessage)
            res.status(400).json({success:false,message:"Deleting messages failed"});
        res.json({success:true,message:"Deleting messages successfully!"})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server failed"})
        console.log(error);
    }
})

router.delete('/:id',verifyToken,async(req,res)=>{
    try 
    {
        const roomDeleteCondition = {_id:req.params.id,owner:req.userId};
        const deletedRoom = await Room.findOneAndDelete(roomDeleteCondition);
        if(!deletedRoom)
            res.status(401).json({success:false,message:"User not authorization or room not found"});
        res.json({success:true,message:"Room has been deleted",deletedRoom});    
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server failed"});
    }
})

router.put('/:id',verifyToken,async(req,res)=>{
    const {password,roomName} = req.body;
    console.log(password,roomName);
    if(!roomName || !password)
        res.status(400).json({success:false,message:"Please enter all fields"});
    try 
    {
        let updateRoom = {
            roomName,
            password
        }
        const roomUpdateCondition = {_id:req.params.id,user:req.userId}
        const updatedRoom = await Room.findByIdAndUpdate(roomUpdateCondition,updateRoom,{new:true});
        if(!updatedRoom)
        {
            res.status(400).json({success:false,message:"Room not found"});
        }
        res.json({success:true,message:"Updated",updatedRoom});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server failed"})
    }
})

module.exports = router;