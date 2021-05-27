import React,{useEffect,useContext} from 'react';
import {RoomContext} from '../../contexts/RoomContext'
import InfoBar from './InfoBar/InfoBar'
import {NEW_MESSAGE} from '../../constants/type'
import {Link,withRouter} from 'react-router-dom'

const ChatRoom = ({match,...rest}) => {
    const {roomState,dispatch,setReloading,loadMessages} = useContext(RoomContext);
    console.log(roomState.messages);
    const chatroomId = match.params.id;
    const socket = rest.socket;
    window.onpopstate=()=>{
        setReloading(true);
    }
    useEffect(()=>{
        socket.emit('joinRoom',{
            chatroomId
        })
        socket.on("newMessage",({message,userId,name})=>{
            dispatch({
                type:NEW_MESSAGE,
                payload:message
            })
        })
        loadMessages(chatroomId);
        return ()=>{
            socket.emit("leaveRoom",{
                chatroomId
            })
        }
    },[])
    return (
        <div className="body">
            <Link to='/'><button className="btn btn-outline-warning" onClick={()=>setReloading(true)}>Back To Homepage</button></Link>
            <InfoBar messages={roomState.messages} socket={socket} chatroomId={chatroomId}/>
        </div>
    )
}

export default withRouter(ChatRoom);