import React,{createContext, useReducer,useEffect, useState} from 'react'
import {authReducer} from '../reducers/auth'
import axios from 'axios'
import * as Type from '../constants/type'
import * as url from '../constants/url'
import setAuth from '../utils/setAuth'

export const AuthContext = createContext();


const AuthContextProvider = ({children}) => {
    const [alert,setAlert] = useState({
        type:"",
        message:""
    })
    const [authState,dispatch] = useReducer(authReducer,{
        authLoading:true,
        isAuthenticated:false,
        user:null,
        searchedUser : null,
        wasFound: false
    });
    
    const loadUser = async() =>{
        const token = localStorage.getItem(Type.AUTH_STORAGE);
        if(token)
            setAuth(token);
        try
        {
            const response = await axios.get(`${url.apiUrl}/auth`);
            if(response.data.success)
            {
                dispatch({
                    type:Type.SET_AUTH,
                    payload:{
                        authLoading:false,
                        isAuthenticated:true,
                        user:response.data.user
                    }
                })
            }
        } 
        catch (error) 
        {
            localStorage.removeItem(Type.AUTH_STORAGE);
            setAuth(null);
            dispatch({
                type:Type.SET_AUTH,
                payload:{
                    isAuthenticated:false,
                    user:null
                }
            })
        }
    }

    const findUser = async id => {
        try 
        {
            const response = await axios.get(`${url.apiUrl}/auth/${id}`);
            if(response.data.success)
            {
                dispatch({
                    type: Type.FIND_USER,
                    payload:response.data.user
                })
            }
        } 
        catch (error) 
        {
            console.log(error)            
        }
    }

    const loginUser = async user =>{
        try
        {
            const response = await axios.post(`${url.apiUrl}/auth/login`,user);
            console.log(typeof response.data.accessToken);
            if(response)
                localStorage.setItem(Type.AUTH_STORAGE,response.data.accessToken);
            await loadUser();
            return response.data;
        }
        catch(error)
        {
            return error.response.data?error.response.data:{success:false,message:error.message};
        }
    }
    const editProfile = async profile => {
        try 
        {
            const response = await axios.put(`${url.apiUrl}/auth/${authState.user._id}`,profile);
            if(response.data.success){
                console.log(response.data.newProfile);
            }
        } 
        catch (error) 
        {
            const context = error.response.data?error.response.data.message:"Something was wrong!";
            console.log(context);
        }
    }

    const logout = () =>{
        localStorage.removeItem(Type.AUTH_STORAGE);
        dispatch({
            type:Type.SET_AUTH,
            payload:{isAuthenticated:false,user:null}
        })
    }

    useEffect(()=>loadUser(),[]);
    const registerUser = async(user) =>
    {
        try {
            const response = await axios.post(`${url.apiUrl}/auth/register`,user);   
            if(response.data.success)
                localStorage.setItem(Type.AUTH_STORAGE,response.data.accessToken);
            await loadUser();
            return response.data;
        } 
        catch (error) 
        {
            return error.response.data?error.response.data:{success:false,message:error.message};
        }
    }

    const authContextData = {
        loginUser,
        registerUser,
        alert,
        setAlert,
        loadUser,
        authState,
        findUser,
        logout,
        editProfile
    }

    return (
        <AuthContext.Provider value = {authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
