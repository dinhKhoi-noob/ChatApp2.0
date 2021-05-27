import React,{useEffect,useState} from 'react'
import {Switch, BrowserRouter as Router,Route} from 'react-router-dom'
import Landing from './components/redirect/Landing';
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import ChatRoom from './components/chat/ChatRoom'
import AuthContextProvider from './contexts/AuthContext'
import RoomContextProvider from './contexts/RoomContext'
import UploadingFileContextProvider from './contexts/UploadingFileContext'
import './App.css'
import {AUTH_STORAGE} from './constants/type'
import io from 'socket.io-client'
import {endPoint} from './constants/url'
import ProtectedRoute from './components/routing/ProtectedRoute'
import Information from './components/auth/Information'

const App = () => {
  const [socket,setSocket] = useState(null);
    const setupSocket = ()=>{
        const token = localStorage.getItem(AUTH_STORAGE);
        if(token && token.length > 0 && !socket)
        {
        const newSocket = io(endPoint,{
            query:{
            token:localStorage.getItem(AUTH_STORAGE)
            }
        });
        newSocket.on("disconnect",()=>{
            setSocket(null);
            setTimeout(setupSocket,3000);
            console.log("socket disconnected")
        })
        newSocket.on("connection",()=>{
            console.log("socket connected")
        })
        setSocket(newSocket);
        }
    }
  useEffect(()=>{
    setupSocket();
  },[])
  return (
      <AuthContextProvider>
        <RoomContextProvider>
          <UploadingFileContextProvider>
            <Router>
              <Switch>
                <Route path="/" component ={Landing} exact/> 
                <Route path="/login" exact render={props=><Auth {...props} setupSocket={setupSocket} authRoute='login'/>}/> 
                <Route path="/register" exact render={props=><Auth {...props} setupSocket={setupSocket} authRoute='register'/>}/> 
                <ProtectedRoute path="/dashboard" exact component={Dashboard} socket={socket} setupSocket={setupSocket}/>
                <ProtectedRoute path="/chatroom/:id" exact setupSocket ={setupSocket} socket={socket} component={ChatRoom} setupSocket/>
                <ProtectedRoute path="/account/:id" exact component={Information}/>
              </Switch>
            </Router>
          </UploadingFileContextProvider>
        </RoomContextProvider>
      </AuthContextProvider>
  )
}

export default App
