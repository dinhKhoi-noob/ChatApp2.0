import React,{useState,useContext} from 'react'
import {Link,withRouter,useHistory} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layouts/AlertMessage'
import {RoomContext} from '../../contexts/RoomContext'

const Login = ({setupSocket}) => {
    const {loginUser,alert,setAlert} = useContext(AuthContext);
    const {setReloading} = useContext(RoomContext);
    const [authState,setAuthState] = useState({
        username:"",
        password:""
    })
    const login = async(event) => {
        event.preventDefault();
        try {
            const response = await loginUser(authState);
            if(!response.success)
            {
                setAlert({type:'danger', message:response.message})
                setTimeout(()=>setAlert({type:"",message:""}),5000);
                setAuthState({username:"",password:""});
            }
            else{
                setReloading(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const onChangeForm=(event)=>{
        setAuthState({...authState,[event.target.name]:event.target.value})
    }
    const {username,password} = authState;
    return (
        <form onSubmit={login} className="form-group">
            <AlertMessage info={alert}/>
            <input type="text"
            className="form-control" placeholder="Username" onChange = {onChangeForm} value={username} name="username"/>
            <input type="password" style={{marginTop:"5px",marginBottom:"5px"}}
            className="form-control" placeholder="Password" name="password" onChange={onChangeForm} value={password}/>
            <button type="submit" className="btn btn-default">Login</button>&nbsp;
            <Link to='/register'>
            <button type="click" className="btn btn-black">Register</button>
            </Link>
        </form>
    )
}

export default withRouter(Login)
