import React,{useContext,useEffect} from 'react'
import {RoomContext} from '../../contexts/RoomContext'
import Spinner from 'react-bootstrap/Spinner'
import OwnerRoom from './OwnerRoom';
import OtherRoom from './OtherRoom';

const ChatSheets = () => {
    const {roomState:{ownerRooms,otherRooms,isLoading},getRooms,setDisplayModal} = useContext(RoomContext);
    useEffect(()=>{
        getRooms()
    },[])
    let byOwner = (
            ownerRooms && ownerRooms.length > 0?
            <div className="row">
                <h5 className="text-center col-lg-12 col-md-12 col-xs-12 col-sm-12 mt-3">Created by you</h5>
                {ownerRooms.map((room,index)=>{
                    return <OwnerRoom room={room} key={index}/>
                })}
            </div>
            :
            <div className="row">
                <div className="card text-black">
                    <div className="card-body">
                        <h4 class="card-title"> You still not create any rooms, let's create a new one or join them below</h4>
                        <button type="button" className="btn btn-outline-primary" onClick={()=>setDisplayModal(true)}>
                            Create one
                        </button>
                    </div>
                </div>
            </div>)
    let byOther = (
                otherRooms && otherRooms.length > 0 ?
                <div className="row">
                    <h5 className="text-center col-lg-12 col-md-12 col-xs-12 col-sm-12 mt-3">Other rooms, let's join them</h5>
                    {otherRooms.map((room,index)=>{
                        return <OtherRoom room={room} key={index}/>
                    })}
                </div>:
                <div className="row">
                    <div className="card text-white">
                        <div className="card-body">
                            Oops! It seems like other people still not create anyone,
                            waiting for a moment or create new one above and chat with them
                        </div>
                    </div>
                </div>
            )
    let body;
    if(!isLoading)
        body = 
            <div className="container">
                {byOwner}
                <hr/>
                {byOther}
            </div>
    else
        body=<div className="spinner-container"><Spinner animation="border" variant="info"/></div>
    return (
        <div>
            {body}
        </div>
    )
}

export default ChatSheets
