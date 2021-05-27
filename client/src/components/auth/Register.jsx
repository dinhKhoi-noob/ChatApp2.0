import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import AlertMessage from '../layouts/AlertMessage'
import {AuthContext} from '../../contexts/AuthContext'

const Register = ({setupSocket}) => {
    const {registerUser,alert,setAlert} = useContext(AuthContext);
    const [registerState,setRegisterState] = useState({
        username:'',
        password:"",
        chatName:"",
        confirmPassword:""
    })
    const {username,password,chatName,confirmPassword} = registerState
    const register = async(event)=>{
        event.preventDefault();
        try 
        {
            if(password !== confirmPassword)
            {
                setAlert({
                    type:"danger",
                    message:"Password do not match, please try again"
                })
                setRegisterState({username:"",password:"",chatName:"",confirmPassword:""})
                setTimeout(()=>setAlert({type:"",message:""}),5000);
                return
            }   
            const response = await registerUser(registerState);
            if(!response.success)
            {
                setAlert({
                    type:"danger",
                    message:response.message
                })
                setRegisterState({username:"",password:"",chatName:"",confirmPassword:""});
                setTimeout(()=>setAlert({type:"",message:""}),5000);
            }
            else
                setupSocket();
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
    const onChangeForm = (event) => {
        setRegisterState({...registerState,[event.target.name]:event.target.value});
    }
    return (
        <form onSubmit={register} className="form-group">
        <AlertMessage info={alert}/>
        <input type="text"
        className="form-control" placeholder="Username" onChange = {onChangeForm} value={username} name="username"/>
        <input type="text" style={{marginTop:"5px",marginBottom:"5px"}}
        className="form-control" placeholder="Chat Name" name="chatName" onChange={onChangeForm} value={chatName}/>
        <input type="password" style={{marginTop:"5px",marginBottom:"5px"}}
        className="form-control" placeholder="Password" name="password" onChange={onChangeForm} value={password}/>
        <input type="password" style={{marginTop:"5px",marginBottom:"5px"}}
        className="form-control" placeholder="Confirm Password" name="confirmPassword" onChange={onChangeForm} value={confirmPassword}/>
        <button type="submit" className="btn btn-default">Create</button>&nbsp;
        <p>Already have an account, go back? </p>
        <Link to='/login'>
            <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
        </Link>
    </form>
    )
}

export default Register