import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { NavLink, Outlet } from "react-router-dom";
import { logoutHandler } from "../services";

const Dashboard = () => {

     const currentUser = useContext(UserContext);

    return (
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="bg-white rounded-3 p-4">
                        <h4 className="d-flex align-items-center fs-3 border-bottom p-4 ">
                            <i className="fas fa-user fa-xl me-2 "></i>
                            {currentUser.user.currentUserName}
                        </h4>
                        <div className="py-4 fs-6">
                            <div>
                                <NavLink className="p-2 p-md-4 dashboard-items text-dark d-block text-decoration-none" to='/dashboard/account'>
                                    <i className=" fas fa-user me-4 text-info"></i>
                                    account
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="p-2 p-md-4 dashboard-items text-dark d-block text-decoration-none" to='/dashboard/orders'>
                                    <i className=" fa fa-list me-4 text-info"></i>
                                    previous orders
                                </NavLink>
                            </div>
                            <div className="p-2 p-md-4 dashboard-items" onClick={e => logoutHandler(e,currentUser)}>
                                <i className=" fa fa-right-from-bracket me-4 text-danger"></i>
                                log out
                            </div>
                        </div>
                    </div>        
                </div>
                <div className="col-md-8">
                    <div className=" bg-white rounded-3 p-3">
                        <Outlet />
                    </div>  
                </div>    
            </div>
    )
}

export default Dashboard;

