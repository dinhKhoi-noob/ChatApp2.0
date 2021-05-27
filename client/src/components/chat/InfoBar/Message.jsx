import React,{useEffect,useContext} from 'react'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import Notification from './Notification';

const Message=({message,user})=> {
    let isSentByCurrentUser = false;
    let isNotification = false;
    // console.log(message.user.username);
    if(user._id === message.user)
        isSentByCurrentUser = true;
    if(message.user === 'admin')
        isNotification = true;
    return (        
        isNotification?<Notification text={message.content}/>:(isSentByCurrentUser?<OutgoingMessage time={message.sentTime} text={message.content} files = {message.staticFiles}/>:<IncomingMessage name={message.chatName} avatar = {message.avatar} text={message.content} time={message.sentTime} files={message.staticFiles}/>)
    )
}

export default Message;
