const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/auth')
const User = require('../models/User');

router.get('/',verify,async (req,res)=>{
    try
    {
        const user = await User.findById(req.userId).select("-password");
        if(!user)
            res.status(400).json({success:false,message:"User not found"});
        return res.json({success:true,message:"Success",user});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server failed"});
    }
})

router.get('/:id',async(req,res)=>{
    try 
    {
        const result = await User.find({_id:req.params.id}).select('-password');
        if(result.length < 1 || !result)
            res.status(400).json({success:false,message:"User not found!"});
        else
        {
            const user = result[0];
            res.json({success:true,message:"Successfully",user});
        }
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server failed"});
    }
})

router.put('/:id',async(req,res)=>{
    const {username,password,avatar,chatname} = req.body;
    if(!password || !chatname)
        res.status(400).json({success:false,message:"Password and chatname is required"});
    try 
    {
        const existedChatname = await User.findOne({chatName:chatname});
        if(existedChatname)
        {
            res.status(400).json({success:false,message:"Chatname already in used"});
            return
        }
        const hashPassword = await argon2.hash(password);
        const newProfile = {
            username,
            password:hashPassword,
            avatar,
            chatName:chatname
        };
        const isUpdate = await User.findByIdAndUpdate({_id:req.params.id},newProfile,{new:true});
        if(!isUpdate)
            res.status(400).json({success:false,message:"User was not authorized"});
        res.json({success:true,message:"Your account has been updated",newProfile});
    } catch (error) 
    {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server failed"});
    }
})

router.post('/register',async(req,res)=>{
    const {username,password, chatName} = req.body;
    if(!username || !password || !chatName)
        res.status(400).json({success:false,message:"Please enter all fields"});
    try 
    {
        const userFindByUsername = await User.findOne({username});
        const userFindByChatName = await User.findOne({chatName});
        if(userFindByUsername)
            return res.status(400).json({success:false,message:"User is already registered"});
        if(userFindByChatName)
            return res.status(400).json({success:false,message:"Chat name is already taken, please trying type another one "});
        const hashPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password:hashPassword,
            chatName
        })
        await newUser.save();
        const accessToken = jwt.sign({userId:newUser._id},process.env.JWT_SECRET);
        res.json({success:true,message:"User has been created",accessToken});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({success:false, message:"Internal server failed"});
    }
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password)
        res.status(400).json({success:false, message:"Missing username or password"});
    try {
        const user = await User.findOne({username});
        if(!user)
            res.status(400).json({success:false, message:"User not found"});
        const passwordValid = await argon2.verify(user.password,password);
        if(!passwordValid)
            return res.status(400).json({
                success:false,
                message:"Invalid username or password"
            })
        const accessToken = jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET)
        res.json({success:true,accessToken,message:"Login successfully"});
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = router