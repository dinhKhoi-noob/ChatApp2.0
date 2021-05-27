import * as Type from '../constants/type'

export const roomReducer = (state,action)=>
{   
    const {type,payload} = action;
    switch(type)
    {
        case Type.GET_ROOMS_SUCCESS:
            return {...state,ownerRooms:payload.ownerRooms,otherRooms:payload.otherRooms, isLoading:false}
        case Type.GET_ROOMS_FAIL:
            return {...state,isLoading:false}
        case Type.CREATE_ROOM:
            return {...state,ownerRooms:[...state.ownerRooms,payload]}
        case Type.DELETE_ROOM:
            return {...state,ownerRooms:state.ownerRooms.filter((room)=>{return room._id !== payload._id})};
        case Type.SET_ROOM:
            return {...state,room:payload};
        case Type.LOAD_MESSAGES:
            return {...state,messages:payload}
        case Type.UPDATE_ROOM:
            return state;
        case Type.NEW_MESSAGE:
            console.log(payload);
            return {...state,messages:[...state.messages,payload]};
        case Type.GET_MESSAGES:
            return state.messages;
        default:
            return state;
    }
}