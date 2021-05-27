import React,{useContext,useState} from 'react'
import {RoomContext} from '../../contexts/RoomContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from './AlertMessage'

const JoinRoomModal = () => {
    const [password,setPassword] = useState("");
    const {joinRoom,roomId,displayingJoinRoomModal,setDisplayingJoinRoomModal} = useContext(RoomContext);
    const {alert,setAlert} = useContext(AuthContext);

    const history = useHistory();
    
    const resetField=()=>{
        setDisplayingJoinRoomModal(false);
        setPassword("");
    }

    const onChangeForm = (event) =>{
        setPassword(event.target.value);
    }

    const closeDialog = ()=>{
        resetField();
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        const reqData = {
            password
        };
        const data = await joinRoom(roomId,reqData);
        console.log(data);
        if(data.success)
        {
            setPassword("");
            history.push(`/chatroom/${roomId}`);
        }
        else
        {
            setAlert({type:"danger",message:data.message})
        }
    }

    return (
        <Modal show={displayingJoinRoomModal} onHide={closeDialog}> 
            <Modal.Header closeButton>
                <Modal.Title>You Must Type The Correct Password To Join This Room</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <AlertMessage info={alert}/>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={onChangeForm}
                            placeholder="Password"
                            required aria-describedby="help-title" 
                            muted 
                        />
                        <Form.Text id="help-title">
                        Required
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <button type="submit" className="btn btn-outline-primary">Join</button>
                <button type="button" className="btn btn-outline-warning" onClick={closeDialog}>Cancel</button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default JoinRoomModal
