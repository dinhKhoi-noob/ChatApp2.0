import React,{useContext,useState} from 'react'
import penIcon from '../../assets/icons/pencil.svg'
import trashIcon from '../../assets/icons/trash.svg'
import exclamationIcon from '../../assets/icons/exclamation-circle.svg'
import {RoomContext} from '../../contexts/RoomContext'
import {Link} from 'react-router-dom'

const ButtonGroup = ({room,type}) => {
    let body;
    const {deleteRoom,deleteAllMessages,setRoomId,setDisplayingJoinRoomModal} = useContext(RoomContext);
    const id = room._id;

    const onJoinForAnotherRoom = () => {
        setRoomId(id);
        setDisplayingJoinRoomModal(true);
    }

    if(type === 'owner')
        body = <div className="text-right">
                <button type="button" className="btn btn-outline-danger" onClick={()=>deleteAllMessages(id)}>
                    Clear Messages
                </button>
                <Link to={`chatroom/${id}`}>
                    <button type="submit" className="btn btn-black">Join</button>
                </Link>
                <button type="button" className="post-button">
                    <img src={penIcon} alt="pen icon" style={{width:"23px",height:"23px"}}/>
                </button>           
                <button type="button" className="post-button"  onClick={()=>deleteRoom(id)}>
                    <img src={trashIcon} alt="trash icon" style={{width:"23px",height:"23px"}}/>
                </button>           
                <button type="button" className="post-button">
                    <img src={exclamationIcon} alt="exclamation icon" style={{width:"23px",height:"23px"}}/>
                </button>
            </div>
    else
        body = <div className="text-right">           
                    <button type="button" className="btn btn-outline-danger" onClick={()=>deleteAllMessages(id)}>
                        Clear Messages
                    </button>
                    <button type="submit" className="btn btn-black" onClick={onJoinForAnotherRoom}>Join</button>
                    <button type="button" className="post-button">
                        <img src={exclamationIcon} alt="exclamation icon" style={{width:"23px",height:"23px"}}/>
                    </button>           
                </div>
    return (
        <>
            {body}
        </>
    )
}

export default ButtonGroup
