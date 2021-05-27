import React,{createContext, useReducer,useEffect, useState} from 'react'
import axios from 'axios';
import {apiUrl} from '../constants/url'
import {roomReducer} from '../reducers/room'
import * as Type from '../constants/type'

export const RoomContext = createContext();

const RoomContextProvider = ({children}) => {
    const [displayModal,setDisplayModal] = useState(false);
    const [displayToast,setDisplayToast] = useState(false);
    const [reloading,setReloading] = useState(false);
    const [passport,setPassport] = useState(false);
    const [displayingJoinRoomModal,setDisplayingJoinRoomModal] = useState(false);
    const [roomId,setRoomId] = useState("");
    const [roomState,dispatch] = useReducer(roomReducer,{
        isLoading:true,
        ownerRooms:[],
        otherRooms:[],
        room:null,
        messages:[],
    });
    const addRoom = async(newRoom)=>{
        try 
        {
            const response = await axios.post(`${apiUrl}/room/create`,newRoom); 
            if(response.data.success)
            {
                dispatch({
                    type:Type.CREATE_ROOM,
                    payload:response.data.newRoom
                })
            }
            return response.data;
        } 
        catch (error) 
        {
            return error.response.data?error.response.data:{success:false,message:"Post failed"};
        }
    }
    const getRooms = async() => {
        try 
        {
            const response = await axios.get(`${apiUrl}/room`);
            if(response.data.success) {
                dispatch({
                    type: Type.GET_ROOMS_SUCCESS,
                    payload: {
                        ownerRooms:response.data.ownerRooms,
                        otherRooms:response.data.otherRooms
                    }
                })
            }
            return response.data;
        } 
        catch (error) 
        {
            dispatch({
                type:Type.GET_ROOMS_FAIL
            })
            return error.response.data? error.response.data:{success:false,message:"Get rooms failed"};
        }
    }

    const joinRoom = async(roomId,reqData) =>
    {
        try 
        {
            const response = await axios.post(`${apiUrl}/room/verify/${roomId}`,reqData);
            if(response.data.success)
            {
                setPassport(true);
                return response.data;
            }
            else
                return response.data;
        } 
        catch (error) 
        {
            return error.response.data? error.response.data:{success:false,message:"Could not find the errors"}
        }
    }

    const loadMessages = async roomId => {
        try 
        {
            console.log(roomId);
            const response = await axios.get(`${apiUrl}/room/messages/${roomId}`);
            if(response.data.success)
                dispatch({
                    type:Type.LOAD_MESSAGES,
                    payload:response.data.messages
                })
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    const deleteRoom = async(roomId) => {
        try 
        {
            const response = await axios.delete(`${apiUrl}/room/${roomId}`)
            if(response.data.success){
                dispatch({
                    type:Type.DELETE_ROOM,
                    payload:response.data.deletedRoom
                })
            }
            await getRooms();
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    const deleteAllMessages = async(roomId) => {
        try 
        {
            const response = await axios.delete(`${apiUrl}/room/messages/${roomId}`);
            if(response.data.success)
                return response.data;
        } 
        catch (error) 
        {
            return error.response.data? error.response.data:{success:false,message:"Something was wrong"};
        }
    }

    const RoomContextData={
        getRooms,
        roomState,
        dispatch,
        addRoom,
        displayToast,
        setDisplayModal,
        setDisplayToast,
        displayModal,
        deleteRoom,
        loadMessages,
        setReloading,
        reloading,
        deleteAllMessages,
        joinRoom,
        passport,
        setDisplayingJoinRoomModal,
        displayingJoinRoomModal,
        roomId,
        setRoomId
    }
    return(
        <RoomContext.Provider value = {RoomContextData}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider;