import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'

const Navbar = () => {
    const {loadUser,logout,authState:{user}} = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: "#e3f2fd"}}>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    <li className="nav-item dropdown" style={{fontSize:"30px",listStyle:"none"}}>
                        <Link className="nav-link dropdown-toggle" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={user.avatar} style={{width:"40px",height:"40px",borderRadius:"100%"}}/></Link>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" to={`account/${user._id}`}>Your account</Link>
                            <Link type="button"  classNameName="dropdown-item" onClick={logout}>Logout</Link>
                        </div>
                    </li>
                </form>
            </div>
        </nav>
    )
}

export default Navbar
