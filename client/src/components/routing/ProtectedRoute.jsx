import React,{useContext} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import {Route,Redirect} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const ProtectedRoute = ({component:Component,...rest}) => {
    const {authState:{isAuthenticated,authLoading}} = useContext(AuthContext);
    if(authLoading)
        return(
            <div className="spinner-container">
                <Spinner variant = "info" animation="border"/>
            </div>
        )

    return (
        <Route {...rest} render={props=>{
            return isAuthenticated?<><Component {...rest} {...props}/></>:
            <Redirect to="/"/>
        }}>
        </Route>
    )
}

export default ProtectedRoute
