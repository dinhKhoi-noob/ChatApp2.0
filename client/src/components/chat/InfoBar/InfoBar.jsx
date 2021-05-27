import React,{useContext} from 'react'
import Input from './Input'
import ScrollToBottom from 'react-scroll-to-bottom';
import {AuthContext} from '../../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import Message from './Message'
import './InfoBar.css'

export default function InfoBar({messages,chatroomId,socket}) {
  console.log(messages);
  const {authState:{user}} = useContext(AuthContext); 
    return (
        <div className="container">
            <h3 className=" text-center">Room</h3>
            <div className="messaging">
            <ScrollToBottom>
              {messages ? messages.map((content,index)=>{
                return <div key = {index}><Message message={content} user={user}/></div>
              }):<div className="spinner-container"><Spinner animation="border" variant="info"/></div>}
            </ScrollToBottom>
            </div>
            <Input chatroomId={chatroomId} socket={socket}/>
        </div>
    )
}
