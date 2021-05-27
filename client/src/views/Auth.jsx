import React,{useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Spinner from 'react-bootstrap/Spinner'
import {Redirect} from 'react-router-dom'

const Auth = ({authRoute,setupSocket}) => {
    let body = null;
    const {authState:{authLoading,isAuthenticated,user}} = useContext(AuthContext);
    if(authLoading)
        body = <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info"></Spinner>
            </div>
    else if(isAuthenticated)
        return <Redirect to="/dashboard"/>
    else
        body=<>
            {authRoute === 'login'&& <Login setupSocket={setupSocket}/>}
            {authRoute === 'register'&& <Register/>}
        </>
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn it</h1>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth