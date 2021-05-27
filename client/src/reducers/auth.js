import * as Type from '../constants/type'

export const authReducer = (state,action)=>{
    const {type,payload} = action;
    switch(type){
        case Type.SET_AUTH:
            return {...state,authLoading:false,isAuthenticated:payload.isAuthenticated,user:payload.user}
        case Type.FIND_USER:
            return {...state,searchedUser: payload,wasFound:true}
        default:
            return state;
    }
}

