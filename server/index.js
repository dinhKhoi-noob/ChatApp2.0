const express = require('express');
const app = express();
const {addUser,removeUser,getUser,getUserInGroup, getUserInRoom} = require('./users');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
const cors = require('cors');
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
const roomRoute = require('./routes/room');
const jwt = require('jsonwebtoken')
const path = require('path');

const connectDB = async ()=>{
    try 
    {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@chatappcluster.pvf54.mongodb.net/myDoc?retryWrites=true&w=majority`,
        {
            useCreateIndex : true,
            useNewUrlParser : true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        },
        ()=>console.log("Database has been accessed")
        )    
    } 
    catch (error) 
    {
        console.log("connect failed");
        console.log(error);
        process.exit(1);
    }
}
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/room',roomRoute);
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/api/upload',uploadRoute);
app.get('/',(req,res)=>{
    res.send("Hello World");
})
const server = app.listen(PORT,()=>console.log(`Hello from port ${PORT}`));
const io = require('socket.io')(server,{
    cors:{
        origin:"https://60af9b7dc88b7e0c6fd891f2--stoic-northcutt-1a880f.netlify.app",
        method:["GET","POST","PUT","DELETE"]
    }
});

const Message = require('./models/Message');
const User = require('./models/User');

io.use(async(socket,next)=>{
    try 
    {
        const token = socket.handshake.query.token;
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        socket.userId = decode.userId;
        next();    
    } 
    catch (error) 
    {
        console.log(error);
    }
})

io.on('connection',(socket)=>{
    console.log("user connected"+socket.userId);
    socket.on("disconnect",()=>{
        console.log("user disconnected"+socket.userId);
    })
    socket.on("joinRoom",({chatroomId})=>{
        socket.join(chatroomId);
        console.log("A user has joined chatroom: "+chatroomId);
    })
    socket.on("leaveRoom",({chatroomId})=>{
        socket.leave(chatroomId);
        console.log("A user has left chatroom: "+chatroomId);
    })
    socket.on("chatroomMessage",async({chatroomId,message,files})=>{
        const user = await User.findOne({_id:socket.userId})
        const newMessage = new Message({
            room:chatroomId,
            user:socket.userId,
            content:message,
            chatName:user.chatName,
            avatar:user.avatar,
            staticFiles:files,
            sentTime:new Date().toLocaleString()
        })
        if(message.trim().length>0)
        {
            io.to(chatroomId).emit("newMessage",{
                name:user.chatName,
                message:newMessage,
                userId:socket.userId
            })
        }
        else
        {
            if(files.lenght > 0){
                io.to(chatroomId).emit("newMessage",{
                    name:user.chatName,
                    message:newMessage,
                    userId:socket.userId
                })  
            }
        }
        await newMessage.save();
    })
})