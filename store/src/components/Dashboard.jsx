import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { NavLink, Outlet } from "react-router-dom";
import { logoutHandler } from "../services";

const Dashboard = () => {

     const currentUser = useContext(UserContext);
    const classStyle= "p-2 p-md-3 dashboard-items text-dark d-block text-decoration-none"
    return (
            <div className="row g-4">
                <div className="col-md-4 col-lg-3">
                    <div className="bg-white rounded-3 p-4">
                        <h4 className="d-flex align-items-center fs-3 border-bottom px-4 py-4 ">
                            <i className="fas fa-user fa-lg me-2 "></i>
                            {currentUser.user.currentUserName}
                        </h4>
                        <div className="py-4 fs-6">
                            <div>
                                <NavLink className={({ isActive }) => isActive ? `nav-link bg-primary text-white rounded-3 ${classStyle}` : `nav-link ${classStyle}`} to='/dashboard/account'>
                                    <i className=" fas fa-user me-2 "></i>
                                    account
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className={({ isActive }) => isActive ? `nav-link bg-primary text-white rounded-3 ${classStyle}` : `nav-link ${classStyle}`} to='/dashboard/orders'>
                                    <i className=" fa fa-list me-2 "></i>
                                    previous orders
                                </NavLink>
                            </div>
                            <div className="p-2 p-md-3 dashboard-items" onClick={e => logoutHandler(e,currentUser)}>
                                <i className=" fa fa-right-from-bracket me-2 text-danger"></i>
                                log out
                            </div>
                        </div>
                    </div>        
                </div>
                <div className="col-md-8 col-lg-9">
                    <div className=" bg-white rounded-3 p-3">
                        <Outlet />
                    </div>  
                </div>    
            </div>
    )
}

export default Dashboard;

