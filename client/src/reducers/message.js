import * as Type from '../constants/type'

export const messageReducer = (state,action) => {
    const {type,payload} = action;
    switch (type) {
        case Type.LOAD_MESSAGES:
            return {...state,messages:payload}
        default:
            return state;
    }
}