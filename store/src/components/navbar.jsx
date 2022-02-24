import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { logoutHandler } from "../services";
import { UserContext } from "../userContext";

const Navbar = () => {

    const currentUser = useContext(UserContext);

    return(
        <nav className="navbar navbar-expand-md navbar-light bg-white px-3 shadow" >
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Our Store</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                         
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link text-info" : "nav-link"} to="/store">
                                <i className="fa fa-shopping-bag"></i> Store
                            </NavLink>
                        </li> 
                        {(currentUser.user.isLoggedIn && currentUser.user.currentUserRole === 'user') ?
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link text-info" : "nav-link"} to="/dashboard">
                                <i className="fa fa-dashboard"></i> Dashboard
                            </NavLink>
                        </li> : ""}
                    </ul>
                    
                    <div style={{marginRight:50}}>
                        <ul className="navbar-nav">
                        {!currentUser.user.isLoggedIn ?
                        <div className="d-md-flex">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register" >Register</NavLink>
                            </li>
                        </div> : 

                            <>
                                <li className="nav-item dropdown">
                                    <NavLink  className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-circle-user me-1"></i>{currentUser.user.currentUserName}
                                    </NavLink>
                                    <ul className="dropdown-menu" style={{ width: '200px' }} aria-labelledby="navbarDropdown">
                                        <li className="dropdown-item p-3"><NavLink className="text-dark text-decoration-none" to='dashboard/account'><i className="fas fa-user me-4 text-info"></i> User Account</NavLink></li>
                                        <li className="dropdown-item p-3"><NavLink className="text-dark text-decoration-none" to='dashboard/orders'><i className="fas fa-list me-4 text-info"></i> Your Orders</NavLink></li>
                                        <li onClick={e => logoutHandler(e,currentUser)} className="dropdown-item p-3"><i className=" fa fa-right-from-bracket me-4 text-danger"></i>Log Out</li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/shoppingcart" ><i className="fas fa-shopping-cart"></i></NavLink>
                                </li>
                            </>
                            }
                        </ul>       
                    </div> 
                </div>
            </div>
        </nav>
    )
}

export default Navbar;