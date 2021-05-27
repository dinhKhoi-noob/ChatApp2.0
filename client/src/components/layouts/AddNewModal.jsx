import React,{useContext,useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {RoomContext} from '../../contexts/RoomContext'

const AddNewModal = () =>{
    const {setDisplayModal,displayModal,setDisplayToast,addRoom,displayToast} = useContext(RoomContext);
    const [newRoom,setNewRoom] = useState({
        roomName:"",
        password:""
    })
    const {roomName,password} = newRoom;

    const resetFields = () => {
        setNewRoom({roomName:"", password:""});
        setDisplayModal(false);
    }
    const onAddRoom = async event => {
        event.preventDefault();
        const {message,success} = await addRoom(newRoom);
        setDisplayToast(
            {...displayToast
                ,success
                ,type:success?"success":"danger"
                ,message,show:true
            });
        resetFields();
    }

    const onTyppingForm = (event) => {
        setNewRoom({...newRoom,[event.target.name]:event.target.value});
    }

    const closeDialog = ()=>{
        resetFields();
    }
    return(
    <Modal show={displayModal} onHide={closeDialog}>
        <Modal.Header closeButton>
            <Modal.Title>Create a new room</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onAddRoom}>
            <Modal.Body>
                <Form.Group>
                    <Form.Control 
                    autofocus={true}
                    type="text" 
                    placeholder="Your Room Name" 
                    name="roomName"
                    value={roomName}  
                    required aria-describedby="help-title" 
                    muted 
                    onChange={onTyppingForm}/>
                    <Form.Text id="help-title">
                        Required
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                    type="password" 
                    placeholder="Room password" 
                    name="password" 
                    value={password}
                    onChange={onTyppingForm}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" 
                class="btn btn-outline-secondary" 
                onClick={closeDialog}>
                    Cancel
                </button>&nbsp;
                <button type="submit"
                 class="btn btn-outline-primary">
                     Create
                </button>
            </Modal.Footer>
        </Form>
    </Modal>
    )
}

export default AddNewModal;