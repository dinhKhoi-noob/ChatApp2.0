import React, { useContext,useEffect } from 'react'
import ChatSheets from '../components/chat/ChatSheets'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {RoomContext} from '../contexts/RoomContext'
import AddNewModal from '../components/layouts/AddNewModal'
import Navbar from '../components/layouts/Navbar'
import JoinRoomModal from '../components/layouts/JoinRoomModal'
import UploadingFileBar from '../components/layouts/UploadingFileBar'

const Dashboard = ({...rest}) => {
    useEffect(()=>{
        rest.setupSocket();
    },[])
    const {setDisplayModal,reloading,setReloading} = useContext(RoomContext)
    if(reloading)
    {
        window.location.reload();
        setReloading(false);
    }
    const onDisplayModal=()=>{
        setDisplayModal(true);
    }
    return (
        <div>
            <Navbar/>
            <AddNewModal/>
            <JoinRoomModal/>
            <ChatSheets/>
            <OverlayTrigger 
                placement="bottom" 
                overlay={
                    <Tooltip>
                        Create a new room
                    </Tooltip>
                }>
                    <i 
                    class="fas fa-plus-circle btn-floating" 
                    onClick={onDisplayModal} 
                    style={{
                        cursor: 'pointer',
                        fontSize:'50px',
                        color:"greenyellow"
                        }}
                    />
            </OverlayTrigger>
        </div>
    )
}

export default Dashboard
