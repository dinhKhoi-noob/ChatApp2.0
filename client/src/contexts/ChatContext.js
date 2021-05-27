import React,{useState,createContext} from 'react'
import {AUTH_STORAGE} from '../constants/type'
import io from 'socket.io-client'
import {endPoint} from '../constants/url'

export const ChatContext = createContext();

const ChatContextProvider = ({childern}) => {
    const [socket,setSocket] = useState(null);
    const setupSocket = ()=>{
        const token = localStorage.getItem(AUTH_STORAGE);
        if(token && token.length > 0 && !socket)
        {
        const newSocket = io(endPoint,{
            query:{
            token:localStorage.getItem(AUTH_STORAGE)
            }
        });
        newSocket.on("disconnect",()=>{
            setSocket(null);
            setTimeout(setupSocket,3000);
            console.log("socket disconnected")
        })
        newSocket.on("connection",()=>{
            console.log("socket connected")
        })
        setSocket(newSocket);
        }
    }
    
    const ChatContextData = {
        socket,
        setSocket,
        setupSocket
    }

    return (
        <ChatContext.Provider value={ChatContextData}>
            {childern}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider
